import { $ } from '../../utils/dom.js';
import { MESSAGES, SELECTOR } from '../../constants/constants.js';
import entryTemplate from './template.js';

export default class EntryPage {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
  }

  init() {
    this.render();
    this.selectDOM();
    this.bindEvents();
    this.renderPage();
  }

  render() {
    this.$content.innerHTML = entryTemplate;
  }

  selectDOM() {
    this.$description = $(SELECTOR.ENTRY_DESCRIPTION);
  }

  bindEvents() {}

  renderPage() {
    if (this.store.isLoggedIn) {
      this.$description.textContent = MESSAGES.ENTRY_DESCRIPTION_LOGGED_IN;
    } else {
      this.$description.textContent = MESSAGES.ENTRY_DESCRIPTION_LOGGED_OUT;
    }
  }
}
