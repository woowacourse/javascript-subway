import { $ } from '../../utils/dom.js';
import { SELECTOR } from '../../constants/constants.js';
import entryTemplate from './template.js';

export default class EntryPage {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
  }

  init() {
    this.render();
  }

  render() {
    this.$content.innerHTML = entryTemplate;
  }
}
