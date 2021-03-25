import { isObject, sessionStore } from '../utils/utils.js';
import { SESSION_STORAGE_KEY, STATE_KEY } from '../constants.js';
import { requestStationList } from '../api/station.js';
import { requestLineList } from '../api/line.js';
import Subject from './Subject.js';

export default class State extends Subject {
  #state;

  constructor() {
    super();
    this.#state = {
      [STATE_KEY.STATION_LIST]: [],
      [STATE_KEY.LINE_LIST]: [],
      [STATE_KEY.SECTION_LIST]: [],
      [STATE_KEY.IS_LOGGED_IN]: false,
      [STATE_KEY.TARGET_LINE_ID]: -1,
      [STATE_KEY.TARGET_SECTION_ID]: -1,
      [STATE_KEY.IS_ITEM_VIEW_MODE]: false,
    };
  }

  update(key, data = []) {
    this.#state = { ...this.#state, [key]: data };
    this.notify(key);
  }

  updateAll(data = []) {
    this.#state = { ...this.#state, data };
    this.notifyAll();
  }

  get(key) {
    if (!key) return;
    if (Array.isArray(this.#state[key])) {
      return [...this.#state[key]];
    }
    if (isObject(this.#state[key])) {
      return { ...this.#state[key] };
    }
    return this.#state[key];
  }

  getAll() {
    return Object.assign({}, this.#state);
  }

  initState() {
    // API 요청을 보내서 역 목록, 노선 목록, 구간 목록을 받아와야 함.
    if (!sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN)) return;
    this.#state.isLoggedIn = true;
    this.#fetchStationList().then(stationList => {
      this.#state.stationList = stationList;
    });
    this.#fetchLineList().then(lineList => {
      this.#state.lineList = lineList;
    });
  }

  async #fetchStationList() {
    const stationList = await requestStationList();
    return stationList.map(stationItem => ({ id: stationItem.id, name: stationItem.name }));
  }

  async #fetchLineList() {
    const lineList = await requestLineList();
    return lineList.map(lineItem => ({
      id: lineItem.id,
      name: lineItem.name,
      color: lineItem.color,
      upStationName: lineItem.upStationName,
      upStationId: lineItem.upStationId,
      downStationName: lineItem.downStationName,
      downStationId: lineItem.downStationId,
    }));
  }
}
