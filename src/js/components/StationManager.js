export default class StationManager {
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
