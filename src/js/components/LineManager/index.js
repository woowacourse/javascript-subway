import { $ } from '../../utils/dom.js';
import { SELECTOR } from '../../constants/constants.js';
import { contentTemplate, modalTemplate } from './template.js';

export default class LineManager {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
    this.$modal = $(SELECTOR.MODAL);
  }

  init() {
    this.render();
    this.selectDOM();
    this.bindEvents();
  }

  render() {
    this.$content.innerHTML = contentTemplate;
    this.$modal.innerHTML = modalTemplate;
  }

  selectDOM() {}

  bindEvents() {}
}
