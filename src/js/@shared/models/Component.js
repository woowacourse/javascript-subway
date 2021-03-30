export class Component {
  #methods = ['setup', 'mountChildComponents', 'bindEvent'];

  constructor() {
    this.mount();
  }

  mount() {
    this.#methods.forEach(method => {
      if (method in this) {
        this[method]();
      }
    });
  }
}
