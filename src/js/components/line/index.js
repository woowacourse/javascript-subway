import getSubwayState, { privateApis } from '../../api/apis.js';
import { CONFIRM_MESSAGE } from '../../constants/message.js';
import Component from '../../core/Component.js';
import { $ } from '../../utils/DOM.js';
import Modal from './modal.js';
import mainTemplate from './template/main.js';
import { lineFormDetail } from './template/modal.js';
class Line extends Component {
  constructor(parentNode, stateManagers) {
    super(
      parentNode,
      stateManagers,
      { modal: new Modal($('.js-modal'), stateManagers) },
      {
        stations: [],
        lines: [],
      }
    );

    this.setChildProps('modal', {
      updateSubwayState: this.updateSubwayState.bind(this),
    });
  }

  renderSelf() {
    const lines = this.state.lines;
    this.parentNode.innerHTML = mainTemplate(lines);
  }

  addEventListeners() {
    $('.js-line-item__create').addEventListener('click', () => {
      this.childComponents.modal.show();
      this.childComponents.modal.clearForm();
      this.childComponents.modal.submitType = 'post';
      $('.js-line-detail-container').innerHTML = lineFormDetail(
        this.state.stations
      );
    });

    $('.js-line-list').addEventListener('click', async ({ target }) => {
      if (target.classList.contains('js-line-item__edit')) {
        this.childComponents.modal.show();
        this.childComponents.modal.submitType = 'put';
        $('.js-line-form__detail')?.remove();

        const id = target.closest('.js-line-item').dataset.id;
        this.childComponents.modal.setTargetId(id);
      }

      if (target.classList.contains('js-line-item__delete')) {
        if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

        const id = target.closest('.js-line-item').dataset.id;
        const accessToken = this.stateManagers.accessToken.getToken();

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
    const accessToken = this.stateManagers.accessToken.getToken();

    const [stations, lines] = await Promise.all([
      (await privateApis.Stations.get({ accessToken })).json(),
      (await privateApis.Lines.get({ accessToken })).json(),
    ]);

    this.setState({ stations, lines });
  }
}
//생성을 하는 순간 private tab들은 App들은 access Token이 없음. 그래서 요청이 불가.

export default Line;
