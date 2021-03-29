import { lineAPI } from '../../../../api/line';
import { $, getFormData } from '../../utils/dom';
import {
  bindModalCloseEvent,
  onModalClose,
  onModalShow,
} from '../../utils/modal';
import { showSnackbar } from '../../utils/snackbar';

class LineModal {
  #userAccessToken;
  #state;

  constructor({ updateLines }) {
    this.updateLines = updateLines;
  }

  init(userAccessToken) {
    this.#userAccessToken = userAccessToken;
    this.initDOM();
  }

  initDOM() {
    this.bindEvent();
  }

  bindEvent() {
    bindModalCloseEvent();
    this.bindLineFormEvent();
    this.bindSelectColorEvent();
  }
  bindLineFormEvent() {
    $('form[name="modify-line"]').addEventListener('submit', e => {
      console.log(this.#state);
      if (this.#state === 'add') {
        this._handleAddLineClose(e);
      }

      if (this.#state === 'modify') {
        this._handleModifyLineClose(e);
      }
    });
  }

  bindSelectColorEvent() {
    $('.subway-line-color-selector').addEventListener('click', e => {
      if (!e.target.classList.contains('color-option')) return;
      this._handleSelectColor(e);
    });
  }

  handleAddLineOpen({ state }) {
    onModalShow();
    this.#state = state;
  }

  async _handleAddLineClose(e) {
    e.preventDefault();
    // TODO : valid 확인

    try {
      const { id, name, color } = await lineAPI.addLine({
        userAccessToken: this.#userAccessToken,
        lineInfo: getFormData(e.target.elements),
      });
      // view 업데이트하기
      this.updateLines(id, { name, color });
      onModalClose();
    } catch (res) {
      const message = await res.text();
      showSnackbar(message);
    }
  }

  // _handleModifyLineClose(e) {
  //   e.preventDefault();
  // }

  _handleSelectColor(e) {
    $('#subway-line-color').value = e.target.dataset.color;
  }
}

export default LineModal;
