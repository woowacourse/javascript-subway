import LineModal from './LineModal.js';
import { linesTemplate, lineTemplate, modalTemplate } from './lineTemplate.js';

import { initLines, initStations } from '../../models/model.js';

import { lineAPI } from '../../../../api/line.js';
import { $ } from '../../utils/dom.js';
import { getLocalStorageItem } from '../../utils/storage.js';
import { showSnackbar } from '../../utils/snackbar.js';
import {
  CLASS_NAME,
  CONFIRM_MESSAGE,
  ERROR_MESSAGE,
  LINE_MODAL_STATE,
  PAGE_TITLE,
  SELECTOR,
  STORAGE,
  SUCCESS_MESSAGE,
} from '../../constants.js';

class Line {
  #userAccessToken;
  #stations;
  #lines;
  #modal;

  constructor() {
    this.#userAccessToken = null;
    this.#stations = {};
    this.#lines = {};
    this.#modal = new LineModal({
      modifyLine: this.modifyLine.bind(this),
      addLine: this.addLine.bind(this),
    });
  }

  async init() {
    this.#userAccessToken = getLocalStorageItem(STORAGE.USER_ACCESS_TOKEN);
    this.#stations = await initStations(this.#userAccessToken);
    this.#lines = await initLines(this.#userAccessToken);
  }

  getPageInfo() {
    return {
      title: PAGE_TITLE.LINES,
      contents: {
        main: linesTemplate(this.#lines),
        modal: modalTemplate(this.#stations),
      },
    };
  }

  initDOM() {
    this.#modal.init(this.#userAccessToken);
    this.$lineList = $(SELECTOR.LINE_LIST);
    this.$createLineButton = $(SELECTOR.CREATE_LINE_BUTTON);
    this._bindEvent();
  }

  _bindEvent() {
    this._bindAddLineEvent();
    this._bindUpdateLineEvent();
  }

  _bindAddLineEvent() {
    this.$createLineButton.addEventListener('click', () => {
      this.#modal.handleLineOpen({ state: LINE_MODAL_STATE.ADD });
    });
  }

  _bindUpdateLineEvent() {
    this.$lineList.addEventListener('click', e => {
      if (e.target.classList.contains(CLASS_NAME.MODIFY_BUTTON)) {
        this.#modal.handleLineOpen({
          state: LINE_MODAL_STATE.MODIFY,
          lineInfo: this._getSelectedLineInfo(e),
        });
      }
      if (e.target.classList.contains(CLASS_NAME.DELETE_BUTTON)) {
        this._handleRemoveLine(e);
      }
    });
  }

  async _handleRemoveLine(e) {
    if (!confirm(CONFIRM_MESSAGE.REMOVE)) return;

    try {
      const lineInfo = this._getSelectedLineInfo(e);

      await lineAPI.deleteLine({
        userAccessToken: this.#userAccessToken,
        id: lineInfo.id,
      });

      this._removeLines(lineInfo);
      showSnackbar(SUCCESS_MESSAGE.REMOVE_LINE);
    } catch {
      showSnackbar(ERROR_MESSAGE.REMOVE_LINE_FAILED);
    }
  }

  _getSelectedLineInfo({ target }) {
    const $lineItem = target.closest('[data-line-id]');
    const id = $lineItem.dataset.lineId;
    const { name, color } = this.#lines[id];

    return { $lineItem, id, name, color };
  }

  addLine({ id, name, color }) {
    this.modifyLine(id, { name, color });
    this.$lineList.insertAdjacentHTML(
      'beforeend',
      lineTemplate(id, { name, color }),
    );
  }

  modifyLine(id, value) {
    this.#lines[id] = value;
  }

  _removeLines({ id, $lineItem }) {
    delete this.#lines[id];
    $lineItem.remove();
  }
}

export default Line;
