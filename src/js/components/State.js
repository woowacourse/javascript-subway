class State {
  #state;
  #listeners;

  constructor(state) {
    this.#state = state ? state : {};
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
    //TODO: 예외처리 생각해보기
    if (!this.#listeners[key]) {
      this.#listeners[key] = [];
    }

    this.#listeners[key].push(handler);
  }
}

export default State;
