import { STATE_KEY } from '../constants';

class State {
  #state;
  #listeners;

  constructor(state = {}) {
    this.#state = state;
    this.#listeners = {};
  }

  getData(key) {
    return this.#deepCopy(this.#state[key]);
  }

  setData(value) {
    Object.keys(value).forEach(key => {
      if (!value[key]) return;

      if (JSON.stringify(this.#state[key]) === JSON.stringify(value[key]))
        return;

      this.#state[key] = value[key];

      if (!this.#listeners[key]) return;

      this.#listeners[key].forEach(handler => {
        handler(this.#state[key]);
      });
    });
  }

  setListener(key, handler) {
    if (typeof handler !== 'function') {
      console.error('handler가 function이 아닙니다.');
      return;
    }

    if (!this.#hasKey(key)) {
      console.error('잘못된 key값입니다.');
      return;
    }

    if (!this.#listeners[key]) {
      this.#listeners[key] = [];
    }

    this.#listeners[key].push(handler);
  }

  #hasKey(key) {
    return Object.values(STATE_KEY).includes(key);
  }

  #deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

export default State;
