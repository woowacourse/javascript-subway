import { lineAPI } from '../../../../api/line';
import {
  CLASS_NAME,
  LINE_MODAL_STATE,
  SELECTOR,
  SUCCESS_MESSAGE,
} from '../../constants';
import { $, $$, clearForm, getFormData } from '../../utils/dom';
import {
  bindModalCloseEvent,
  onModalClose,
  onModalShow,
} from '../../utils/modal';
import { showSnackbar } from '../../utils/snackbar';
import { lineItemInfoTemplate } from './lineTemplate';
import { checkLineValid, checkLineModifyValid } from './lineValidator';

class LineModal {
  #props;
  #userAccessToken;
  #state;
  #lineInfo;

  constructor(props) {
    this.#props = props;
  }

  init(userAccessToken) {
    this.#userAccessToken = userAccessToken;
    this.initDOM();
  }

  initDOM() {
    this.$lineTitle = $(SELECTOR.LINE_MODAL_TITLE);
    this.$lineForm = $(SELECTOR.LINE_FORM);
    this.$lineName = $(SELECTOR.SUBWAY_LINE_NAME);
    this.$lineColor = $(SELECTOR.SUBWAY_LINE_COLOR);
    this.$lineColorSelector = $(SELECTOR.SUBWAY_LINE_COLOR_SELECTOR);
    this.$optionals = $$(SELECTOR.OPTIONAL, this.$lineForm);
    this.bindEvent();
  }

  bindEvent() {
    bindModalCloseEvent();
    this._bindLineFormEvent();
    this._bindSelectColorEvent();
  }

  _bindLineFormEvent() {
    this.$lineForm.addEventListener('submit', e => {
      if (this.#state === LINE_MODAL_STATE.ADD) {
        this._handleAddLineClose(e);
      }

      if (this.#state === LINE_MODAL_STATE.MODIFY) {
        this._handleModifyLineClose(e);
      }
    });
  }

  _bindSelectColorEvent() {
    this.$lineColorSelector.addEventListener('click', e => {
      if (!e.target.classList.contains(CLASS_NAME.COLOR_OPTION)) return;
      this._handleSelectColor(e);
    });
  }

  handleLineOpen({ state, lineInfo = {} }) {
    this.#state = state;
    this.#lineInfo = lineInfo;
    onModalShow();

    if (state === LINE_MODAL_STATE.ADD) {
      this.$lineTitle.textContent = LINE_MODAL_STATE.ADD_TITLE;
      this.$optionals.forEach(element => {
        element.classList.remove(CLASS_NAME.HIDE);
        element.required = true;
      });
    }

    if (state === LINE_MODAL_STATE.MODIFY) {
      this.$lineTitle.textContent = LINE_MODAL_STATE.MODIFY_TITLE;

      this.$optionals.forEach(element => {
        element.classList.add(CLASS_NAME.HIDE);
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
      const newLine = await lineAPI.addLine({
        userAccessToken: this.#userAccessToken,
        lineInfo,
      });

      this.#props.addLine(newLine);
      clearForm(this.$lineForm);
      showSnackbar(SUCCESS_MESSAGE.ADD_LINE);
      onModalClose();
    } catch (res) {
      console.log(res);
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
      alert(message);
      return;
    }

    try {
      await lineAPI.modifyLine({
        userAccessToken: this.#userAccessToken,
        id,
        name: newName,
        color: newColor,
      });

      $(SELECTOR.LINE_ITEM_INFO, $lineItem).innerHTML = lineItemInfoTemplate({
        name: newName,
        color: newColor,
      });

      this.#props.modifyLine(id, { name: newName, color: newColor });
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
