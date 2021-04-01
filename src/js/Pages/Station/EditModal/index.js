import { privateApis } from '../../../api';
import { ERROR_MESSAGE } from '../../../constants/message';
import ModalComponent from '../../../core/ModalComponent';
import { $ } from '../../../utils/DOM';
import { stationModal } from './template';

class EditModal extends ModalComponent {
  // 파라미터가 너무 많아서 분리가 필요해보임
  constructor({ parentNode, modalKey }) {
    super({ parentNode, modalKey });
  }

  renderSelf() {
    this.parentNode.insertAdjacentHTML(
      'beforeend',
      stationModal({ state: this.state, modalKey: this.modalKey })
    );
  }

  fillTargetInForm() {
    const { name } = this.state.stations.find(
      ({ id }) => id === Number(this.targetId)
    );
    $(`#${this.modalKey}-subway-station-name`).value = name;
  }

  addEventListeners() {
    $('.modal-close').addEventListener('click', () => this.hide());

    $(`#${this.modalKey}-edit-station-form`).addEventListener(
      'submit',
      async (e) => {
        e.preventDefault();
        const stationId = this.targetId;
        // TODO: 현재 이름과 새로 수정할 이름이 같은경우 예외처리
        const name = e.target['subway-station-name'].value;
        const accessToken = localStorage.getItem('accessToken') || '';

        try {
          const response = await privateApis.Stations.put({
            stationId,
            accessToken,
            body: { name },
          });

          if (response.status === 401) {
            throw Error(ERROR_MESSAGE.INVALID_TOKEN);
          }

          if (!response.ok) throw Error(await response.text());

          this.hide();
          await this.updateSubwayState();
        } catch (error) {
          // TODO: 스낵바
          console.error(error.message);
        }
      }
    );
  }
}

export default EditModal;
