import { privateApis } from '../../../api';
import { UNAUTHENTICATED_LINK } from '../../../constants/link';
import localStorageKey from '../../../constants/localStorage';
import ModalComponent from '../../../core/ModalComponent';
import ExpiredTokenError from '../../../error/ExpiredTokenError';
import { $ } from '../../../utils/DOM';
import modal from './template';

class AddModal extends ModalComponent {
  constructor({
    parentNode,
    modalKey,
    props: { goPage, setIsLogin, updateSubwayState },
  }) {
    super({ parentNode, modalKey });

    this.goPage = goPage;
    this.setIsLogin = setIsLogin;
    this.updateSubwayState = updateSubwayState;
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

      const accessToken =
        localStorage.getItem(localStorageKey.ACCESSTOKEN) || '';

      const body = {
        upStationId,
        downStationId,
        duration,
        distance,
      };

      try {
        await privateApis.sections.post({ lineId, accessToken, body });
        await this.updateSubwayState();
      } catch (error) {
        if (error instanceof ExpiredTokenError) {
          this.setIsLogin(false);
          this.goPage(UNAUTHENTICATED_LINK.LOGIN);
        }
        console.error(error.message);
      }
    });
  }
}

export default AddModal;
