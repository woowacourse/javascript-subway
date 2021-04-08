import getFetchParams from '../../api/getFetchParams.js';
import api from '../../api/requestHttp.js';
import { SUCCESS_MESSAGE } from '../../constants/message.js';
import { MODAL, SECTION } from '../../constants/selector.js';
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
    $(MODAL.MAIN_CONTAINER).innerHTML = sectionsModal(this.state);
  }

  addEventListeners() {
    $(MODAL.CLOSE).addEventListener('click', () => this.hide());

    $(SECTION.ID.CREATE_FORM).addEventListener('submit', async (e) => {
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

      await api.create(
        params,
        this.snackbar,
        this.updateSubwayState.bind(this)
      );
    });
  }
}

export default Modal;
