import { $ } from '../../utils/DOM.js';
import { PATH } from '../../constants/url.js';
import { linesModal } from './template/modal.js';
import request from '../../utils/request.js';
import getFetchParams from '../../api/getFetchParams.js';
import ModalComponent from '../../core/ModalComponent.js';
import { DATASET, LINE, MODAL } from '../../constants/selector.js';
import { SUCCESS_MESSAGE } from '../../constants/message.js';

class Modal extends ModalComponent {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
    this.requestType = 'post';
  }

  renderSelf() {
    const stations = this.state.stations;
    this.parentNode.innerHTML = linesModal(stations);
  }

  addEventListeners() {
    $(MODAL.CLOSE).addEventListener('click', () => this.hide());

    $(LINE.CLASS.COLOR_SELECTOR).addEventListener('click', ({ target }) => {
      if (!target.classList.contains(LINE.CLASSLIST.COLOR_OPTION)) return;

      const { bgColor } = target.dataset;
      $(LINE.ID.COLOR).value = bgColor;
      $(LINE.ID.COLOR_PREVIEW).setAttribute(DATASET.BG_COLOR, bgColor);
    });

    $(LINE.ID.FORM).addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = e.target['subway-line-name'].value;
      const lineColor = e.target['subway-line-color'].value;
      const accessToken = this.stateManagers.accessToken.getToken();

      switch (this.requestType) {
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
      const response = await request[this.requestType](params);

      if (!response.ok) throw Error(await response.text());

      this.updateSubwayState();

      if (this.requestType === 'post') {
        this.snackbar.show(SUCCESS_MESSAGE.CREATE);
        return;
      }

      if (this.requestType === 'put') {
        this.snackbar.show(SUCCESS_MESSAGE.UPDATE);
        return;
      }
    } catch (error) {
      this.snackbar.show(error.message);
      console.error(error.message);
    }
  }

  fillTargetInForm() {
    const { name, color } = this.state.lines.find(
      (line) => line.id === Number(this.targetId)
    );

    this.changeModalTitle('🛤️ 노선 수정');
    $(LINE.ID.NAME).value = name;
    $(LINE.ID.COLOR).value = color;
    $(LINE.ID.COLOR_PREVIEW).setAttribute(DATASET.BG_COLOR, color);
  }

  clearForm() {
    this.changeModalTitle('🛤️ 노선 관리');
    $(LINE.ID.FORM).reset();
    $(LINE.ID.COLOR_PREVIEW).setAttribute(DATASET.BG_COLOR, '');
  }

  changeModalTitle(title) {
    $(LINE.ID.TITLE).innerText = title;
  }
}

export default Modal;
