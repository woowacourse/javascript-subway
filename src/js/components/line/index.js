import getSubwayState from '../../api/apis.js';
import getFetchParams from '../../api/getFetchParams.js';
import { CONFIRM_MESSAGE } from '../../constants/message.js';
import { PATH } from '../../constants/url.js';
import Component from '../../core/Component.js';
import { $ } from '../../utils/DOM.js';
import request from '../../utils/request.js';
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
        const params = getFetchParams({
          path: `${PATH.LINES}/${id}`,
          accessToken,
        });

        try {
          const response = await request.delete(params);

          if (!response.ok) throw Error(await response.text());
          this.updateSubwayState();
        } catch (error) {
          console.error(error.message);
        }
      }
    });
  }

  async updateSubwayState() {
    const { stations, lines } = await getSubwayState(
      this.stateManagers.accessToken.getToken()
    );

    this.setState({ stations, lines });
  }
}
//생성을 하는 순간 private tab들은 App들은 access Token이 없음. 그래서 요청이 불가.

export default Line;
