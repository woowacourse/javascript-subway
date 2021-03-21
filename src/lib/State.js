import { SESSION_STORAGE_KEY } from '../constants.js';
import { isObject, sessionStore } from '../utils/utils.js';
import Subject from './Subject.js';

export default class State extends Subject {
  #state;

  constructor() {
    super();
    this.#state = {
      stationList: ['사당', '방배'],
      lineList: [{ name: '1호선' }, { name: '2호선' }],
      sectionList: [{ name: '섹션1' }, { name: '섹션2' }],
      isLoggedIn: false,
    };

    this.#initState();
  }
  
  update(key, data = {}) {
    this.#state = { ...this.#state, [key]: data };
    this.notify(key);
  }
  
  updateAll(data = {}) {
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

  #initState() {
    if (sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN)) {
      this.#state.isLoggedIn = true;
      return;
    }
    this.#state.isLoggedIn = false;
  }
}
