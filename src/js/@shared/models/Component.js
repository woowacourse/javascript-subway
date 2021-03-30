export class Component {
  #methods = ['setup', 'mountChildComponents', 'bindEvent'];

  constructor() {
    this.mount();
  }

  mount() {
    this.#methods.forEach(method => {
      if (this.isMethod(method)) {
        this[method]();
      }
    });
  }

  isMethod(method) {
    return method in this && typeof this[method] === 'function';
  }
}
