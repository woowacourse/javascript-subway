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
    $('.js-modal').innerHTML = sectionsModal(this.state);
  }

  addEventListeners() {
    $('.modal-close').addEventListener('click', () => this.hide());

    $('#create-section-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const lineId = e.target['select-line'].value;
      const upStationId = e.target['up-station'].value;
      const downStationId = e.target['down-station'].value;
      const duration = e.target['duration'].value;
      const distance = e.target['distance'].value;

      const accessToken = this.stateManagers.accessToken.getToken();

      const params = getFetchParams({
        path: `${PATH.LINES}/${lineId}${PATH.SECTIONS}`,
        body: {
          upStationId,
          downStationId,
          duration,
          distance,
        },
        accessToken,
      });

      try {
        const response = await request.post(params);

        if (!response.ok) throw Error(await response.text());

        await this.updateSubwayState();
      } catch (error) {
        console.error(error.message);
      }
    });
  }
}

export default Modal;
