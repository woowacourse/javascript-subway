import ModalComponent from '../../core/ModalComponent.js';
import { $ } from '../../utils/DOM.js';
import linesModal from './template/modal.js';
import request from '../../utils/request.js';
import { PATH } from '../../constants/url.js';
import getFetchParams from '../../api/getFetchParams.js';

class Modal extends ModalComponent {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
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

    $('#create-line-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = e.target['subway-line-name'].value;
      const upStation = e.target['subway-line-up-station'].value;
      const downStation = e.target['subway-line-down-station'].value;

      const distance = e.target['distance'].value;
      const duration = e.target['duration'].value;

      const lineColor = e.target['subway-line-color'].value;

      const accessToken = this.stateManagers.accessToken.getToken();
      const params = getFetchParams({
        path: PATH.LINES,
        body: {
          name,
          color: lineColor,
          upStationId: upStation,
          downStationId: downStation,
          distance,
          duration,
        },
        accessToken,
      });

      try {
        const response = await request.post(params);

        if (!response.ok) throw Error(await response.text());

        this.updateSubwayState();
      } catch (error) {
        console.error(error.message);
      }
    });
  }
}

export default Modal;
