import ModalComponent from '../../../core/ModalComponent';
import { $ } from '../../../utils/DOM';
import modal from './template';
import { privateApis } from '../../../api';
import LOCAL_STORAGE_KEY from '../../../constants/localStorage';
import ExpiredTokenError from '../../../error/ExpiredTokenError';
import { UNAUTHENTICATED_LINK } from '../../../constants/link';

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
      modal({ state: this.state, modalKey: this.modalKey })
    );
  }

  addEventListeners() {
    super.addEventListeners();

    $(`.${this.modalKey}-js-subway-line-color-selector`).addEventListener(
      'click',
      ({ target }) => {
        if (!target.classList.contains('color-option')) return;

        const { bgColor } = target.dataset;
        $(`#${this.modalKey}-subway-line-color`).value = bgColor;
        $(`#${this.modalKey}-subway-line-color-preview`).setAttribute(
          'data-bg-color',
          bgColor
        );
      }
    );

    $(`#${this.modalKey}-line-form`).addEventListener('submit', async (e) => {
      e.preventDefault();
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);
      const name = e.target['subway-line-name'].value;
      const color = e.target['subway-line-color'].value;

      try {
        await privateApis.lines.put({
          lineId: this.targetId,
          accessToken,
          body: {
            name,
            color,
          },
        });

        this.updateSubwayState();
      } catch (error) {
        if (error instanceof ExpiredTokenError) {
          this.setIsLogin(false);
          this.goPage(UNAUTHENTICATED_LINK.LOGIN);
        }
        console.error(error.message);
      }
    });
  }

  fillTargetInForm() {
    const { name, color } = this.state.lines.find(
      (line) => line.id === Number(this.targetId)
    );

    $(`#${this.modalKey}-subway-line-name`).value = name;
    $(`#${this.modalKey}-subway-line-color`).value = color;
    $(`#${this.modalKey}-subway-line-color-preview`).setAttribute(
      'data-bg-color',
      color
    );
  }

  clearForm() {
    $(`#${this.modalKey}-line-form`).reset();
    $(`#${this.modalKey}-subway-line-color-preview`).setAttribute(
      'data-bg-color',
      ''
    );
  }

  changeModalTitle(title) {
    $(`#${this.modalKey}-line-title`).innerText = title;
  }
}

export default EditModal;
