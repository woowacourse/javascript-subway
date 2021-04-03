import { privateApis } from '../../../api';
import { UNAUTHENTICATED_LINK } from '../../../constants/link';
import LOCAL_STORAGE_KEY from '../../../constants/localStorage';
import { SNACKBAR_MESSAGE } from '../../../constants/message';
import ModalComponent from '../../../core/ModalComponent';
import ExpiredTokenError from '../../../error/ExpiredTokenError';
import { $ } from '../../../utils/DOM';
import { showSnackbar } from '../../../utils/snackbar';
import modal from './template';

class AddModal extends ModalComponent {
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

      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);

      const body = {
        upStationId,
        downStationId,
        duration,
        distance,
      };

      try {
        await privateApis.sections.post({ lineId, accessToken, body });
        showSnackbar(SNACKBAR_MESSAGE.SECTION.CREATE.SUCCESS);
        await this.updateSubwayState();
      } catch (error) {
        if (error instanceof ExpiredTokenError) {
          this.setIsLogin(false);
          this.goPage(UNAUTHENTICATED_LINK.LOGIN);
        }
        console.error(error.message);
        showSnackbar(error.message || SNACKBAR_MESSAGE.SECTION.CREATE.FAIL);
      }
    });
  }
}

export default AddModal;
