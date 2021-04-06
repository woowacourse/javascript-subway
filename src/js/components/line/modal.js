import ModalComponent from '../../core/ModalComponent.js';
import { $ } from '../../utils/DOM.js';
import { linesModal } from './template/modal.js';
import request from '../../utils/request.js';
import { PATH } from '../../constants/url.js';
import getFetchParams from '../../api/getFetchParams.js';

class Modal extends ModalComponent {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
    this.submitType = 'post';
  }

  renderSelf() {
    const { stations } = this.stateManagers.subwayState.getSubwayState();
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
      const name = e.target['subway-line-name'].value;
      const lineColor = e.target['subway-line-color'].value;
      const accessToken = this.stateManagers.accessToken.getToken();

      switch (this.submitType) {
        case 'post':
          this.createLine(e.target, name, lineColor, accessToken);
          break;

        case 'put':
          this.editLine(name, lineColor, accessToken);
          break;

        default:
          break;
      }
    });
  }

  async createLine(target, name, lineColor, accessToken) {
    const upStation = target['subway-line-up-station'].value;
    const downStation = target['subway-line-down-station'].value;
    const distance = target['distance'].value;
    const duration = target['duration'].value;
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

    await this.getResponse(params);
  }

  async editLine(name, lineColor, accessToken) {
    const params = getFetchParams({
      path: `${PATH.LINES}/${this.targetId}`,
      body: {
        name,
        color: lineColor,
      },
      accessToken,
    });

    await this.getResponse(params);
  }

  async getResponse(params) {
    try {
      const response = await request[this.submitType](params);

      if (!response.ok) throw Error(await response.text());

      this.stateManagers.subwayState.updateSubwayState(
        this.stateManagers.accessToken.getToken()
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  fillTargetInForm() {
    const { lines } = this.stateManagers.subwayState.getSubwayState();
    const { name, color } = lines.find(
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
