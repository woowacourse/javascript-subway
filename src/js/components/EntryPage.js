import { $ } from '../utils/dom.js';
import { MESSAGES, SELECTOR } from '../constants/constants.js';

export default class EntryPage {
  constructor(store) {
    this.store = store;
  }

  init() {
    this.selectDOM();
    this.bindEvents();
    this.renderPage();
  }

  selectDOM() {
    this.$description = $(SELECTOR.ENTRY_DESCRIPTION);
  }

  bindEvents() {}

  renderPage() {
    if (this.store.userSession.isLoggedIn) {
      this.$description.textContent = MESSAGES.ENTRY_DESCRIPTION_LOGGED_IN;
    } else {
      this.$description.textContent = MESSAGES.ENTRY_DESCRIPTION_LOGGED_OUT;
    }
  }
}
