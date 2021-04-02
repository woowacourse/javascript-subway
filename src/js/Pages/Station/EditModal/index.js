import { privateApis } from '../../../api';
import { UNAUTHENTICATED_LINK } from '../../../constants/link';
import localStorageKey from '../../../constants/localStorage';
import ExpiredTokenError from '../../../error/ExpiredTokenError';
import { $ } from '../../../utils/DOM';
import { stationModal } from './template';
import ModalComponent from '../../../core/ModalComponent';

class EditModal extends ModalComponent {
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
        const accessToken =
          localStorage.getItem(localStorageKey.ACCESSTOKEN) || '';

        try {
          await privateApis.Stations.put({
            stationId,
            accessToken,
            body: { name },
          });

          this.hide();
          console.log(this);
          console.log(this.updateSubwayState);
          await this.updateSubwayState();
        } catch (error) {
          if (error instanceof ExpiredTokenError) {
            this.setIsLogin(false);
            this.goPage(UNAUTHENTICATED_LINK.LOGIN);
          }

          // TODO: 스낵바
          console.error(error.message);
        }
      }
    );
  }
}

export default EditModal;
