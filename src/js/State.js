class State {
  #state;
  #listeners;

  constructor(state) {
    if (state === undefined) {
      console.error('state가 undefined입니다.');
    }

    this.#state = state;
    this.#deepFreeze(this.#state);
    this.#listeners = [];
  }

  get Data() {
    return this.#deepCopy(this.#state);
  }

  set Data(value) {
    if (!value) return;

    if (this.#deepValidateEquality(this.#state, value)) return;

    this.#state = value;

    this.#listeners.forEach(handler => {
      handler(this.#state);
    });
  }

  pushData(value) {
    if (!Array.isArray(this.#state)) {
      console.error('state Data의 형태가 Array가 아닙니다.');
      return;
    }

    const myData = this.Data;

    myData.push(value);
    this.Data = myData;
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

  #deepValidateEquality = (target, source) => {
    const targetKeys = Object.keys(target);
    const sourceKeys = Object.keys(source);

    if (targetKeys.length !== sourceKeys.length) {
      return false;
    }

    return targetKeys.every(key => {
      if (source[key] === undefined) {
        return false;
      }

      if (typeof target[key] === 'object') {
        return this.#deepValidateEquality(target[key], source[key]);
      }

      return target[key] === source[key];
    });
  };

  #deepFreeze = object => {
    Object.freeze(object);

    Object.keys(object).forEach(key => {
      const value = object[key];

      if (typeof value !== 'object') {
        return;
      }

      this.#deepFreeze(value);
    });
  };

  #deepCopy = object => {
    const newObject = object instanceof Array ? [] : {};

    Object.keys(object).forEach(key => {
      const value = object[key];

      if (typeof value !== 'object') {
        newObject[key] = value;

        return;
      }

      newObject[key] = this.#deepCopy(value);
    });

    return newObject;
  };
}

export default State;
