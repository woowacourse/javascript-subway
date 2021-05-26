import getSubwayState from '../../api/fetchGetSubwayState.js';
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
    super(parentNode, stateManagers, {
      modal: new Modal($('.js-modal'), stateManagers),
    });
  }

  renderSelf() {
    const { lines } = this.stateManagers.subwayState.getSubwayState();
    this.parentNode.innerHTML = mainTemplate(lines);
    this.childComponents.modal.render();
  }

  addEventListeners() {
    $('.js-line-item__create').addEventListener('click', () => {
      this.childComponents.modal.show();
      this.childComponents.modal.clearForm();
      this.childComponents.modal.submitType = 'post';
      const { stations } = this.stateManagers.subwayState.getSubwayState();
      $('.js-line-detail-container').innerHTML = lineFormDetail(stations);
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

        await this.deleteItem(id, accessToken);
      }
    });
  }

  async deleteItem(id, accessToken) {
    const params = getFetchParams({
      path: `${PATH.LINES}/${id}`,
      accessToken,
    });

    try {
      const response = await request.delete(params);

      if (!response.ok) throw Error(await response.text());
      this.stateManagers.subwayState.updateSubwayState(accessToken);
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default Line;
