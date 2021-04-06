import getSubwayState from '../../api/fetchGetSubwayState.js';
import getFetchParams from '../../api/getFetchParams.js';
import { CONFIRM_MESSAGE } from '../../constants/message.js';
import { PATH } from '../../constants/url.js';
import Component from '../../core/Component.js';
import { $ } from '../../utils/DOM.js';
import request from '../../utils/request.js';
import Modal from './modal.js';
import { mainTemplate, sectionItem } from './template/main.js';

class Section extends Component {
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
    $('.js-section-item__create').addEventListener('click', () => {
      this.childComponents.modal.show();
    });

    $('.js-section-form__select').addEventListener('change', ({ target }) => {
      const lineId = target.value;
      const { lines } = this.stateManagers.subwayState.getSubwayState();
      const { color, stations } = lines.find(
        (line) => line.id === Number(lineId)
      );

      $('.js-section-list').innerHTML = stations
        .map((station) => sectionItem(station))
        .join('');

      $('.js-section-list').setAttribute('data-line-id', lineId);
      $('.js-section-form__select').setAttribute('data-bg-color', color);
    });

    $('.js-section-list').addEventListener('click', async ({ target }) => {
      if (!target.classList.contains('js-section-item__delete')) return;

      if (!confirm(CONFIRM_MESSAGE.DELETE)) return;

      const lineId = target.closest('.js-section-list').dataset.lineId;
      const stationId = target.closest('.js-section-item').dataset.stationId;
      const accessToken = this.stateManagers.accessToken.getToken();

      await deleteItem(lineId, stationId, accessToken);
    });
  }

  async deleteItem(lineId, stationId, accessToken) {
    try {
      const params = getFetchParams({
        path: `${PATH.LINES}/${lineId}/sections?stationId=${stationId}`,
        accessToken,
      });

      const response = await request.delete(params);

      if (!response.ok) throw Error(await response.text());

      this.stateManagers.subwayState.updateSubwayState(accessToken);
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default Section;
