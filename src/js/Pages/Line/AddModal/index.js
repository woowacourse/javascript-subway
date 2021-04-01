import ModalComponent from '../../../core/ModalComponent';
import { $ } from '../../../utils/DOM';
import modal from './template';
import { privateApis } from '../../../api';
import { ERROR_MESSAGE } from '../../../constants/message';

class AddModal extends ModalComponent {
  constructor(parentNode, modalKey) {
    super(parentNode, modalKey);
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
      const accessToken = localStorage.getItem('accessToken') || '';
      const name = e.target['subway-line-name'].value;
      const color = e.target['subway-line-color'].value;
      const upStationId = target['subway-line-up-station'].value;
      const downStationId = target['subway-line-down-station'].value;
      const distance = target['distance'].value;
      const duration = target['duration'].value;

      if (this.submitType === 'post') {
        try {
          const response = await privateApis.Lines.post({
            accessToken,
            body: {
              name,
              color,
              upStationId,
              downStationId,
              distance,
              duration,
            },
          });

          if (response.status === 401) {
            throw Error(ERROR_MESSAGE.INVALID_TOKEN);
          }

          if (!response.ok) throw Error(await response.text());

          this.updateSubwayState();
        } catch (error) {
          console.error(error.message);
        }
      }

      if (this.submitType === 'put') {
        try {
          const response = await privateApis.Lines.put({
            accessToken,
            body: {
              name,
              color,
            },
          });

          if (response.status === 401) {
            throw Error(ERROR_MESSAGE.INVALID_TOKEN);
          }

          if (!response.ok) throw Error(await response.text());

          this.updateSubwayState();
        } catch (error) {
          console.error(error.message);
        }
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
}

export default AddModal;
