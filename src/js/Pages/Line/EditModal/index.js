import ModalComponent from '../../../core/ModalComponent';
import { $ } from '../../../utils/DOM';
import modal from './template';
import Apis from '../../../api';
import { showSnackbar } from '../../../utils/snackbar';
import { SNACKBAR_MESSAGE } from '../../../constants/message';
import HTTPError from '../../../error/HTTPError';

class EditModal extends ModalComponent {
  constructor({ parentNode, modalName, props: { updateSubwayState } }) {
    super({ parentNode, modalName });

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

    $(`.${this.modalName}-js-color-selector`).addEventListener(
      'click',
      ({ target }) => {
        if (!target.classList.contains('color-option')) return;

        const { bgColor } = target.dataset;
        $(`#${this.modalName}-color`).value = bgColor;
        $(`#${this.modalName}-color-preview`).setAttribute(
          'data-bg-color',
          bgColor
        );
      }
    );

    $(`#${this.modalName}-line-form`).addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = e.target['name'].value;
      const color = e.target['subway-line-color'].value;

      try {
        await Apis.lines.put({
          lineId: this.targetId,
          body: {
            name,
            color,
          },
        });

        await this.updateSubwayState();
      } catch (error) {
        if (error instanceof HTTPError) {
          error.handleError();
        }

        console.error(error.message);
      }
    });
  }

  fillTargetInForm() {
    const { name, color } = this.state.lines.find(
      (line) => line.id === Number(this.targetId)
    );

    $(`#${this.modalName}-name`).value = name;
    $(`#${this.modalName}-color`).value = color;
    $(`#${this.modalName}-color-preview`).setAttribute('data-bg-color', color);
  }

  clearForm() {
    $(`#${this.modalName}-line-form`).reset();
    $(`#${this.modalName}-color-preview`).setAttribute('data-bg-color', '');
  }

  changeModalTitle(title) {
    $(`#${this.modalName}-line-title`).innerText = title;
  }
}

export default EditModal;
