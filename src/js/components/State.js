class State {
  #state;
  #listener;

  constructor(state) {
    this.#state = state;
    this.#listener = {};
  }

  getData(key) {
    return this.#state[key];
  }

  setData(value) {
    Object.keys(value).forEach(key => {
      if (!value[key]) return;
      if (this.#state[key] === value[key]) return;

      this.#state[key] = value[key];

      if (!this.#listener[key]) return;

      this.#listener[key].forEach(handler => {
        handler(this.#state[key]);
      });
    });
  }

  setListener(key, handler) {
    //TODO: 예외처리 생각해보기
    if (!this.#listener[key]) {
      this.#listener[key] = [];
    }

    this.#listener[key].push(handler);
  }
}

export default State;
