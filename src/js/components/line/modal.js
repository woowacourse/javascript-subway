import ModalComponent from '../../core/ModalComponent.js';
import { $ } from '../../utils/DOM.js';
import { linesModal } from './template/modal.js';
import { privateApis } from '../../api/apis.js';

class Modal extends ModalComponent {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
    this.submitType = 'post';
  }

  renderSelf() {
    const stations = this.state.stations;
    this.parentNode.innerHTML = linesModal(stations);
  }

  addEventListeners() {
    $('.modal-close').addEventListener('click', () => this.hide());

    $('.js-subway-line-color-selector').addEventListener(
      'click',
      ({ target }) => {
        if (!target.classList.contains('color-option')) return;

        const { bgColor } = target.dataset;
        $('#subway-line-color').value = bgColor;
        $('#subway-line-color-preview').setAttribute('data-bg-color', bgColor);
      }
    );

    $('#line-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const accessToken = this.stateManagers.accessToken.getToken();
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

    this.changeModalTitle('🛤️ 노선 수정');
    $('#subway-line-name').value = name;
    $('#subway-line-color').value = color;
    $('#subway-line-color-preview').setAttribute('data-bg-color', color);
  }

  clearForm() {
    this.changeModalTitle('🛤️ 노선 관리');
    $('#line-form').reset();
    $('#subway-line-color-preview').classList;
    $('#subway-line-color-preview').setAttribute('data-bg-color', '');
  }

  changeModalTitle(title) {
    $('#line-title').innerText = title;
  }
}

export default Modal;
