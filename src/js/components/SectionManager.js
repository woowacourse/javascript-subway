export default class SectionManager {
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
