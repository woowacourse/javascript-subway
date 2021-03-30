import LineModal from './LineModal.js';
import { linesTemplate, modalTemplate } from './lineTemplate.js';

import { ERROR_MESSAGE, PAGE_TITLE, STORAGE } from '../../constants.js';
import { $ } from '../../utils/dom.js';
import { getLocalStorageItem } from '../../utils/storage.js';
import { stationAPI } from '../../../../api/station.js';
import { lineAPI } from '../../../../api/line.js';

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
    this.#modal.init(this.#userAccessToken);
    this._bindEvent();
  }

  _bindEvent() {
    this._bindAddLineEvent();
  }

  _bindAddLineEvent() {
    $('.create-line-btn').addEventListener('click', e => {
      this.#modal.handleLineOpen({ state: 'add' });
    });
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

  updateLines(id, value) {
    this.#lines[id] = value;
  }
}

export default Line;
