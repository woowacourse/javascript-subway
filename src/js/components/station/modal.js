import getFetchParams from '../../api/getFetchParams.js';
import api from '../../api/requestHttp.js';
import { MODAL, STATION } from '../../constants/selector.js';
import { PATH } from '../../constants/url.js';
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
    $(STATION.ID.STATION_NAME).value = name;
  }

  addEventListeners() {
    $(MODAL.CLOSE).addEventListener('click', () => this.hide());

    $(STATION.ID.EDIT_FORM).addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = this.targetId;
      // TODO: 현재 이름과 새로 수정할 이름이 같은경우 예외처리
      const newName = e.target['subway-station-name'].value;
      const accessToken = this.stateManagers.accessToken.getToken();
      const params = getFetchParams({
        path: `${PATH.STATIONS}/${id}`,
        body: { name: newName },
        accessToken,
      });

      await api.update(
        params,
        this.snackbar,
        this.updateSubwayState.bind(this)
      );
    });
  }
}

export default Modal;
