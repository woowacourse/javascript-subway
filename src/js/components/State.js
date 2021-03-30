class State {
  #state;
  #listeners;

  constructor(state) {
    if (state === undefined) {
      console.error('state가 undefined입니다.');
    }

    this.#state = state;
    this.#listeners = [];
  }

  get Data() {
    return this.#deepCopy(this.#state);
  }

  set Data(value) {
    if (!value) return;

    if (JSON.stringify(this.#state) === JSON.stringify(value)) return;

    this.#state = value;

    this.#listeners.forEach(handler => {
      handler(this.#state);
    });
  }

  initListener() {
    this.#listeners = [];
  }

  setListener(handler) {
    if (typeof handler !== 'function') {
      console.error('handler가 function이 아닙니다.');
      return;
    }

    this.#listeners.push(handler);
  }

  #deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

export default State;
