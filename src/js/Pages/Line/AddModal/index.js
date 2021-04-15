import ModalComponent from '../../../core/ModalComponent';
import { $ } from '../../../utils/DOM';
import modal from './template';
import Apis from '../../../api';
import HTTPError from '../../../error/HTTPError';

class AddModal extends ModalComponent {
  constructor({ parentNode, modalName, props: { updateSubwayState } }) {
    super({ parentNode, modalName });

    this.updateSubwayState = updateSubwayState;
  }

  renderSelf() {
    console.log(this.state);
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
      const upStationId = e.target['subway-line-up-station'].value;
      const downStationId = e.target['subway-line-down-station'].value;
      const distance = e.target['distance'].value;
      const duration = e.target['duration'].value;

      try {
        await Apis.lines.post({
          body: {
            name,
            color,
            upStationId,
            downStationId,
            distance,
            duration,
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
}

export default AddModal;
