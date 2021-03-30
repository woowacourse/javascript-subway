import { lineAPI } from '../../../../api/line';
import { SELECTOR, SUCCESS_MESSAGE } from '../../constants';
import { $, $$, clearForm, getFormData } from '../../utils/dom';
import {
  bindModalCloseEvent,
  onModalClose,
  onModalShow,
} from '../../utils/modal';
import { showSnackbar } from '../../utils/snackbar';
import { lineTemplate, lineItemInfoTemplate } from './lineTemplate';
import { checkLineValid, checkLineModifyValid } from './lineValidator';

class LineModal {
  #userAccessToken;
  #state;
  #lineInfo;

  constructor({ updateLines }) {
    this.updateLines = updateLines;
  }

  init(userAccessToken) {
    this.#userAccessToken = userAccessToken;
    this.initDOM();
  }

  initDOM() {
    this.$lineTitle = $(SELECTOR.LINE_MODAL_TITLE);
    this.$lineForm = $(SELECTOR.LINE_FORM);
    this.$lineList = $(SELECTOR.LINE_LIST);
    this.$lineName = $('#subway-line-name');
    this.$lineColor = $('#subway-line-color');
    this.bindEvent();
  }

  bindEvent() {
    bindModalCloseEvent();
    this.bindLineFormEvent();
    this.bindSelectColorEvent();
  }

  bindLineFormEvent() {
    this.$lineForm.addEventListener('submit', e => {
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

  handleLineOpen({ state, lineInfo = {} }) {
    this.#state = state;
    this.#lineInfo = lineInfo;
    onModalShow();
    if (state === 'add') {
      this.$lineTitle.textContent = '🛤️ 노선 추가';
      $$('.optional', this.$lineForm).forEach(element => {
        element.classList.remove('hide');
        element.required = true;
      });
    }

    if (state === 'modify') {
      this.$lineTitle.textContent = '🛤️ 노선 수정';
      $$('.optional', this.$lineForm).forEach(element => {
        element.classList.add('hide');
        element.required = false;
      });

      const { name, color } = this.#lineInfo;
      this.$lineName.value = name;
      this.$lineColor.value = color;
      this.$lineName.select();
    }
  }

  async _handleAddLineClose(e) {
    e.preventDefault();
    const lineInfo = getFormData(e.target.elements);
    const message = checkLineValid(lineInfo);
    if (message) {
      alert(message);
      return;
    }

    try {
      const { id, name, color } = await lineAPI.addLine({
        userAccessToken: this.#userAccessToken,
        lineInfo,
      });

      this.updateLines(id, { name, color });
      this.$lineList.insertAdjacentHTML(
        'beforeend',
        lineTemplate(id, { name, color }),
      );

      clearForm(this.$lineForm);
      showSnackbar(SUCCESS_MESSAGE.ADD_LINE);
      onModalClose();
    } catch (res) {
      const message = await res.text();
      showSnackbar(message);
    }
  }

  async _handleModifyLineClose(e) {
    e.preventDefault();

    const newName = this.$lineName.value;
    const newColor = this.$lineColor.value;
    const { $lineItem, id, name, color } = this.#lineInfo;
    if (newName === name && newColor === color) {
      onModalClose();
      return;
    }

    const message = checkLineModifyValid({ name, color });
    if (message) {
      onModalClose();
      return;
    }

    try {
      await lineAPI.modifyLine({
        userAccessToken: this.#userAccessToken,
        id,
        name: newName,
        color: newColor,
      });

      $('.line-item-info', $lineItem).innerHTML = lineItemInfoTemplate({
        name: newName,
        color: newColor,
      });

      this.updateLines(id, { name: newName, color: newColor });
      onModalClose();
      showSnackbar(SUCCESS_MESSAGE.MODIFY_LINE);
    } catch (res) {
      const message = await res.text();
      showSnackbar(message);
    }
  }

  _handleSelectColor(e) {
    this.$lineColor.value = e.target.dataset.color;
  }
}

export default LineModal;
