import { removeLocalStorageItem } from '../../utils/storage';
import { headerTemplate } from './headerTemplate';
import { $ } from '../../utils/dom';
import { showSnackbar } from '../../utils/snackbar';
import { SELECTOR, PATH, STORAGE, SUCCESS_MESSAGE } from '../../constants';

class Header {
  #props;
  #isLoggedIn;

  constructor(props) {
    this.#props = props;
    this.#isLoggedIn = null;
  }

  init(isLoggedIn) {
    this.#isLoggedIn = isLoggedIn;
    this._initDOM();
  }

  _initDOM() {
    this.$target = $(SELECTOR.HEADER);
    this.$target.innerHTML = headerTemplate(this.#isLoggedIn);
    this.$menu = $(SELECTOR.MENU);
    this._bindEvent();
  }

  _bindEvent() {
    this._bindMenuEvent();
  }

  _bindMenuEvent() {
    this.$menu.addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') return;
      this._handleChangeMenu(e);
    });
  }

  _handleChangeMenu(e) {
    e.preventDefault();

    const href = e.target.closest(SELECTOR.MENU_LINK).getAttribute('href');
    if (href === PATH.LOGOUT) {
      this._logout();
      return;
    }
    this.#props.switchURL(href);
  }

  _logout() {
    removeLocalStorageItem(STORAGE.USER_ACCESS_TOKEN);
    this.#props.switchURL(PATH.HOME);
    showSnackbar(SUCCESS_MESSAGE.LOGOUT);
  }
}

export default Header;
