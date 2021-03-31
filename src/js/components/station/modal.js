import { privateApis } from '../../api/apis.js';
import ModalComponent from '../../core/ModalComponent.js';
import { $ } from '../../utils/DOM.js';
import { stationModal } from './template/modal.js';

class Modal extends ModalComponent {
  // 파라미터가 너무 많아서 분리가 필요해보임
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
  }

  renderSelf() {
    this.parentNode.innerHTML = stationModal();
  }

  fillTargetInForm() {
    const { name } = this.state.stations.find(
      ({ id }) => id === Number(this.targetId)
    );
    $('#subway-station-name').value = name;
  }

  addEventListeners() {
    $('.modal-close').addEventListener('click', () => this.hide());

    $('#edit-station-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const stationId = this.targetId;
      // TODO: 현재 이름과 새로 수정할 이름이 같은경우 예외처리
      const name = e.target['subway-station-name'].value;
      const accessToken = this.stateManagers.accessToken.getToken();

      try {
        const response = await privateApis.Stations.put({
          stationId,
          accessToken,
          body: { name },
        });

        if (!response.ok) throw Error(await response.text());

        this.hide();
        await this.updateSubwayState();
      } catch (error) {
        // TODO: 스낵바
        console.error(error.message);
      }
    });
  }
}

export default Modal;
