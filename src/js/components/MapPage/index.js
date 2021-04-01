import { SELECTOR } from '../../constants/constants.js';
import { $ } from '../../utils/dom.js';
import { contentTemplate } from './template.js';

export default class MapPage {
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
    this.$content.innerHTML = contentTemplate;
  }

  selectDOM() {}

  bindEvents() {}
}
