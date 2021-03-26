import { $ } from '../../utils/dom.js';
import { SELECTOR } from '../../constants/constants.js';
import stationTemplate from './template.js';

export default class StationManager {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
  }

  init() {
    this.render();
    this.selectDOM();
    this.bindEvents();
  }

  render() {
    this.$content.innerHTML = stationTemplate;
  }

  selectDOM() {}

  bindEvents() {}
}
