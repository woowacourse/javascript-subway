export class Cache {
  #value = [];
  constructor(value) {
    this.#value = value;
  }

  clear() {
    this.#value = [];
  }

  setValue(value) {
    this.#value = value;
  }

  getValue() {
    return this.#value;
  }
}
