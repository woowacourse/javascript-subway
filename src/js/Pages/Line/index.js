import { privateApis } from '../../api';
import { CONFIRM_MESSAGE } from '../../constants/message';
import Component from '../../core/Component';
import { $ } from '../../utils/DOM';
import AddModal from './AddModal';
import EditModal from './EditModal';
import mainTemplate from './template';

class Line extends Component {
  constructor({ parentNode, state }) {
    super({
      parentNode,
      childComponents: {
        addmodal: new AddModal({
          parentNode,
          modalKey: 'line-add',
        }),
        editmodal: new EditModal({
          parentNode,
          modalKey: 'line-edit',
        }),
      },
      state,
    });

    this.setChildProps('addmodal', {
      updateSubwayState: this.updateSubwayState.bind(this),
    });

    this.setChildProps('editmodal', {
      updateSubwayState: this.updateSubwayState.bind(this),
    });
  }

  renderSelf() {
    console.log(this.state);
    this.parentNode.innerHTML = mainTemplate({ state: this.state });
  }

  addEventListeners() {
    $('.js-line-item__create').addEventListener('click', () => {
      this.childComponents.addmodal.show();
      this.childComponents.addmodal.clearForm();
    });

    $('.js-line-list').addEventListener('click', async ({ target }) => {
      if (target.classList.contains('js-line-item__edit')) {
        this.childComponents.editmodal.show();

        const id = target.closest('.js-line-item').dataset.id;
        this.childComponents.editmodal.setTargetId(id);
      }

      if (target.classList.contains('js-line-item__delete')) {
        if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

        const id = target.closest('.js-line-item').dataset.id;
        const accessToken = localStorage.getItem('accessToken') || '';

        try {
          const response = await privateApis.Lines.delete({
            lineId: id,
            accessToken,
          });

          if (!response.ok) throw Error(await response.text());
          this.updateSubwayState();
        } catch (error) {
          console.error(error.message);
        }
      }
    });
  }

  async updateSubwayState() {
    const accessToken = localStorage.getItem('accessToken') || '';

    const [stations, lines] = await Promise.all([
      (await privateApis.Stations.get({ accessToken })).json(),
      (await privateApis.Lines.get({ accessToken })).json(),
    ]);

    this.setState({ stations, lines });
  }
}
//생성을 하는 순간 private tab들은 App들은 access Token이 없음. 그래서 요청이 불가.

export default Line;
