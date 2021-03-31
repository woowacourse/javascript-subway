import LineModal from './LineModal.js';
import { linesTemplate, modalTemplate } from './lineTemplate.js';

import {
  CONFIRM_MESSAGE,
  ERROR_MESSAGE,
  PAGE_TITLE,
  SELECTOR,
  STORAGE,
  SUCCESS_MESSAGE,
} from '../../constants.js';
import { $ } from '../../utils/dom.js';
import { getLocalStorageItem } from '../../utils/storage.js';
import { stationAPI } from '../../../../api/station.js';
import { lineAPI } from '../../../../api/line.js';
import { showSnackbar } from '../../utils/snackbar.js';

class Line {
  #userAccessToken;
  #stations;
  #lines;
  #modal;

  constructor() {
    this.#userAccessToken = null;
    this.#stations = {};
    this.#lines = {};
    this.#modal = new LineModal({ updateLines: this.updateLines.bind(this) });
  }

  async init() {
    this.#userAccessToken = getLocalStorageItem(STORAGE.USER_ACCESS_TOKEN);
    await this._initStations();
    await this._initLines();
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
    this.$lineList = $(SELECTOR.LINE_LIST);
    this.#modal.init(this.#userAccessToken);
    this._bindEvent();
  }

  async _initStations() {
    try {
      this.#stations = {};

      const stations = await stationAPI.getStations(this.#userAccessToken);
      stations.forEach(({ id, ...rest }) => {
        this.#stations[id] = rest;
      });
    } catch {
      alert(ERROR_MESSAGE.LOAD_STATION_FAILED);
    }
  }

  async _initLines() {
    try {
      this.#lines = {};

      const lines = await lineAPI.getLines(this.#userAccessToken);
      lines.forEach(({ id, name, color }) => {
        this.#lines[id] = { name, color };
      });
    } catch {
      alert(ERROR_MESSAGE.LOAD_LINE_FAILED);
    }
  }

  _bindEvent() {
    this._bindAddLineEvent();
    this._bindUpdateLineEvent();
  }

  _bindAddLineEvent() {
    $('.create-line-btn').addEventListener('click', () => {
      this.#modal.handleLineOpen({ state: 'add' });
    });
  }

  _bindUpdateLineEvent() {
    this.$lineList.addEventListener('click', e => {
      if (e.target.classList.contains('modify-button')) {
        this.#modal.handleLineOpen({
          state: 'modify',
          lineInfo: this._getSelectedLineInfo(e),
        });
      }
      if (e.target.classList.contains('delete-button')) {
        this._handleRemoveLine(e);
      }
    });
  }

  async _handleRemoveLine(e) {
    if (!confirm(CONFIRM_MESSAGE.REMOVE)) return;

    try {
      const { $lineItem, id } = this._getSelectedLineInfo(e);

      await lineAPI.deleteLine({
        userAccessToken: this.#userAccessToken,
        id,
      });

      delete this.#lines[id];
      $lineItem.remove();
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

  updateLines(id, value) {
    this.#lines[id] = value;
  }
}

export default Line;
