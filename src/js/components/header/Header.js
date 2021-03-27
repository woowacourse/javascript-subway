import { removeLocalStorageItem } from '../../utils/storage.js';
import { headerTemplate } from './headerTemplate.js';
import { $ } from '../../utils/dom.js';
import { showSnackbar } from '../../utils/snackbar.js';
import { SELECTOR, PATH, STORAGE, SNACKBAR_MESSAGE } from '../../constants.js';

class Header {
  #props;
  #isLoggedIn;

  constructor(props) {
    this.#props = props;
    this.#isLoggedIn = null;
  }

  init(isLoggedIn) {
    this.#isLoggedIn = isLoggedIn;
    this.initDOM();
    this._selectDOM();
    this._bindMenuEvent();
  }

  initDOM() {
    this.$target = $(SELECTOR.HEADER);
    this.$target.innerHTML = headerTemplate(this.#isLoggedIn);
  }

  _selectDOM() {
    this.$menu = $(SELECTOR.MENU);
  }

  _bindMenuEvent() {
    this.$menu.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.tagName !== 'BUTTON') return;
      this._changeMenu(e);
    });
  }

  _changeMenu({ target }) {
    const href = target.closest(SELECTOR.MENU_LINK).getAttribute('href');
    if (href === PATH.LOGOUT) {
      this._handleLogout();
      return;
    }
    this.#props.switchURL(href);
  }

  _handleLogout() {
    removeLocalStorageItem(STORAGE.USER_ACCESS_TOKEN);
    this.#props.switchURL(PATH.HOME);
    showSnackbar(SNACKBAR_MESSAGE.LOGOUT);
  }
}

export default Header;
