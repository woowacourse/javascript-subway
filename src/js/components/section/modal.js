import getFetchParams from '../../api/getFetchParams.js';
import { PATH } from '../../constants/url.js';
import ModalComponent from '../../core/ModalComponent.js';
import { $ } from '../../utils/DOM.js';
import request from '../../utils/request.js';
import sectionsModal from './template/modal.js';

class Modal extends ModalComponent {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
  }

  renderSelf() {
    const { stations, lines } = this.stateManagers.subwayState.getSubwayState();
    $('.js-modal').innerHTML = sectionsModal({ stations, lines });
  }

  addEventListeners() {
    $('.modal-close').addEventListener('click', () => this.hide());

    $('#create-section-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const lineId = e.target['select-line'].value;
      const body = {
        upStationId: e.target['up-station'].value,
        downStationId: e.target['down-station'].value,
        duration: e.target['duration'].value,
        distance: e.target['distance'].value,
      };
      const accessToken = this.stateManagers.accessToken.getToken();

      await this.createItem(lineId, body, accessToken);
    });
  }

  async createItem(lineId, body, accessToken) {
    const params = getFetchParams({
      path: `${PATH.LINES}/${lineId}${PATH.SECTIONS}`,
      body,
      accessToken,
    });

    try {
      const response = await request.post(params);

      if (!response.ok) throw Error(await response.text());

      this.stateManagers.subwayState.updateSubwayState(accessToken);
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default Modal;
