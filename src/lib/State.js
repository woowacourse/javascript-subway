import { isObject, sessionStore } from '../utils/utils.js';
import { SESSION_STORAGE_KEY, STATE_KEY } from '../constants.js';
import { requestStationList } from '../api/station.js';
import Subject from './Subject.js';

export default class State extends Subject {
  #state;

  constructor() {
    super();
    this.#state = {
      [STATE_KEY.STATION_LIST]: [{ id: 1, name: '역 1'} , { id: 2, name: '역 2'}],
      [STATE_KEY.LINE_LIST]: [{ name: '노선 1' }, { name: '노선 2' }],
      [STATE_KEY.SECTION_LIST]: [{ name: '구간 1' }, { name: '구간 2' }],
      [STATE_KEY.IS_LOGGED_IN]: false,
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
    this.#fetchStationLists().then(list => {
      this.#state.stationList = list;
    });
  }

  async #fetchStationLists() {
    const list = await requestStationList();
    return list.map(stationItem => ({ id: stationItem.id, name: stationItem.name }));
  }
  
}

