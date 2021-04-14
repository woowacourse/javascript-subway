import Apis from '../../../api';
import { $ } from '../../../utils/DOM';
import { stationModal } from './template';
import ModalComponent from '../../../core/ModalComponent';
import { showSnackbar } from '../../../utils/snackbar';
import { SNACKBAR_MESSAGE } from '../../../constants/message';
import HTTPError from '../../../error/HTTPError';

class EditModal extends ModalComponent {
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
      stationModal({ state: this.state, modalName: this.modalName })
    );
  }

  fillTargetInForm() {
    const { name } = this.state.stations.find(
      ({ id }) => id === Number(this.targetId)
    );
    $(`#${this.modalName}-name`).value = name;
  }

  addEventListeners() {
    super.addEventListeners();

    $(`#${this.modalName}-form`).addEventListener('submit', async (e) => {
      e.preventDefault();
      const stationId = this.targetId;
      const name = e.target['name'].value;

      try {
        await Apis.stations.put({
          stationId,
          accessToken,
          body: { name },
        });

        this.hide();
        await this.updateSubwayState();
        showSnackbar(SNACKBAR_MESSAGE.STATION.UPDATE.SUCCESS);
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

export default EditModal;
