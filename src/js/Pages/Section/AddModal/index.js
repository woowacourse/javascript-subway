import { privateApis } from '../../../api';
import { ERROR_MESSAGE } from '../../../constants/message';
import ModalComponent from '../../../core/ModalComponent';
import { $ } from '../../../utils/DOM';
import modal from './template';

class AddModal extends ModalComponent {
  constructor({ parentNode, modalkey }) {
    super({ parentNode, modalkey });
  }

  renderSelf() {
    this.parentNode.insertAdjacentHTML(
      'beforeend',
      modal({ state: this.state, modalKey: this.modalKey })
    );
  }

  addEventListeners() {
    super.addEventListeners();

    $('#create-section-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      // TODO: lineId 기본 설정 안하면  undefined됨
      const lineId = e.target['select-line'].value;
      const upStationId = e.target['up-station'].value;
      const downStationId = e.target['down-station'].value;
      const duration = e.target['duration'].value;
      const distance = e.target['distance'].value;

      const accessToken = localStorage.getItem('accessToken') || '';

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

        if (response.status === 401) {
          throw Error(ERROR_MESSAGE.INVALID_TOKEN);
        }

        if (!response.ok) throw Error(await response.text());

        await this.updateSubwayState();
      } catch (error) {
        console.error(error.message);
      }
    });
  }
}

export default AddModal;
