export default class LineManager {
  constructor(store) {
    this.store = store;
  }

  init() {
    this.selectDOM();
    this.bindEvents();
  }

  selectDOM() {}

  bindEvents() {}
}
