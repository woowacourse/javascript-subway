import { privateApis } from '../../../api';
import { UNAUTHENTICATED_LINK } from '../../../constants/link';
import LOCAL_STORAGE_KEY from '../../../constants/localStorage';
import ExpiredTokenError from '../../../error/ExpiredTokenError';
import { $ } from '../../../utils/DOM';
import { stationModal } from './template';
import ModalComponent from '../../../core/ModalComponent';
import { showSnackbar } from '../../../utils/snackbar';
import { SNACKBAR_MESSAGE } from '../../../constants/message';

class EditModal extends ModalComponent {
  constructor({
    parentNode,
    modalName,
    props: { goPage, setIsLogin, updateSubwayState },
  }) {
    super({ parentNode, modalName });

    this.goPage = goPage;
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
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);

      try {
        await privateApis.stations.put({
          stationId,
          accessToken,
          body: { name },
        });

        this.hide();
        await this.updateSubwayState();
        showSnackbar(SNACKBAR_MESSAGE.STATION.UPDATE.SUCCESS);
      } catch (error) {
        if (error instanceof ExpiredTokenError) {
          this.setIsLogin(false);
          this.goPage(UNAUTHENTICATED_LINK.LOGIN);
        }

        showSnackbar(error.message || SNACKBAR_MESSAGE.STATION.UPDATE.FAIL);
        console.error(error.message);
      }
    });
  }
}

export default EditModal;
