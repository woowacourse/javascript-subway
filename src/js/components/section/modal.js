import { privateApis } from '../../api/apis.js';
import ModalComponent from '../../core/ModalComponent.js';
import { $ } from '../../utils/DOM.js';
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

      // TODO: lineId 기본 설정 안하면  undefined됨
      const lineId = e.target['select-line'].value;
      const upStationId = e.target['up-station'].value;
      const downStationId = e.target['down-station'].value;
      const duration = e.target['duration'].value;
      const distance = e.target['distance'].value;

      const accessToken = this.stateManagers.accessToken.getToken();

      const body = {
        upStationId,
        downStationId,
        duration,
        distance,
      };

      try {
        const response = await privateApis.Sections.post(
          lineId,
          accessToken,
          body
        );

        if (!response.ok) throw Error(await response.text());

        await this.updateSubwayState();
      } catch (error) {
        console.error(error.message);
      }
    });
  }
}

export default Modal;
