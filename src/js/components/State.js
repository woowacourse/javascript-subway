import { STATE_KEY } from '../constants';

class State {
  #state;
  #listeners;

  constructor(state = {}) {
    this.#state = state;
    this.#listeners = {};
  }

  getData(key) {
    return this.#state[key];
  }

  setData(value) {
    Object.keys(value).forEach(key => {
      if (!value[key]) return;
      if (this.#state[key] === value[key]) return;

      this.#state[key] = value[key];

      if (!this.#listeners[key]) return;

      this.#listeners[key].forEach(handler => {
        handler(this.#state[key]);
      });
    });
  }

  setListener(key, handler) {
    if (typeof handler !== 'function') {
      alert('handler가 function이 아닙니다.');
      return;
    }

    if (!this.#isKey(key)) {
      alert('잘못된 key값입니다.');
      return;
    }

    if (!this.#listeners[key]) {
      this.#listeners[key] = [];
    }

    this.#listeners[key].push(handler);
  }

  #isKey(key) {
    return Object.values(STATE_KEY).includes(key);
  }
}

export default State;
