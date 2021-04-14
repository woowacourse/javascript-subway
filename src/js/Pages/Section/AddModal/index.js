import Apis from '../../../api';
import { SNACKBAR_MESSAGE } from '../../../constants/message';
import ModalComponent from '../../../core/ModalComponent';
import { $ } from '../../../utils/DOM';
import { showSnackbar } from '../../../utils/snackbar';
import modal from './template';
import HTTPError from '../../../error/HTTPError';

class AddModal extends ModalComponent {
  constructor({
    parentNode,
    modalName,
    props: { setIsLogin, updateSubwayState },
  }) {
    super({ parentNode, modalName });

    this.setIsLogin = setIsLogin;
    this.updateSubwayState = updateSubwayState;
  }

  renderSelf() {
    this.parentNode.insertAdjacentHTML(
      'beforeend',
      modal({ state: this.state, modalName: this.modalName })
    );
  }

  addEventListeners() {
    super.addEventListeners();

    $('#create-section-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const lineId = e.target['select-line'].value;
      const upStationId = e.target['up-station'].value;
      const downStationId = e.target['down-station'].value;
      const duration = e.target['duration'].value;
      const distance = e.target['distance'].value;

      const body = {
        upStationId,
        downStationId,
        duration,
        distance,
      };

      try {
        await Apis.sections.post({ lineId, body });
        showSnackbar(SNACKBAR_MESSAGE.SECTION.CREATE.SUCCESS);
        await this.updateSubwayState();
      } catch (error) {
        if (error instanceof HTTPError) {
          this.setIsLogin(false);
          error.handleError();
        }

        console.error(error.message);
      }
    });
  }
}

export default AddModal;
