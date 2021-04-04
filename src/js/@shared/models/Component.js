export class Component {
  constructor() {
    this.mount();
  }

  mount() {
    const methods = ['setup', 'mountChildComponents', 'bindEvent'];

    methods.forEach(method => this[method]?.());
  }
}
