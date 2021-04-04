export class State {
  #value = null;
  #subscribers = [];

  constructor(value) {
    this.#value = value;
  }

  get() {
    return this.#value;
  }

  set(newValue) {
    if (this.#value === newValue) return;
    this.#value = newValue;
    this.notify();
  }

  subscribe(handler) {
    if (this.#subscribers.includes(handler)) {
      console.warn('Already subscribed handler.'); // 배포 단계에서는 제거 or 주석

      return;
    }
    this.#subscribers.push(handler);
  }

  notify() {
    this.#subscribers.forEach(subscriber => subscriber(this.#value));
  }

  clear() {
    this.#value = null;
  }
}
