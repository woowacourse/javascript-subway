import { removeLocalStorageItem } from '../../utils/storage.js';
import { headerTemplate } from './headerTemplate.js';

class Header {
  constructor(props) {
    this.props = props;
    this.userToken = null;
  }

  init(isLoggedIn) {
    this.userToken = isLoggedIn;
    this.initDOM();
    this.selectDOM();
    this.bindMenuEvent();
  }

  initDOM() {
    this.$target = document.querySelector('header');
    this.$target.innerHTML = headerTemplate(this.userToken);
  }

  selectDOM() {
    this.$menu = document.querySelector('.menu');
  }

  bindMenuEvent() {
    this.$menu.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.tagName !== 'BUTTON') return;
      this._changeMenu(e);
    });
  }

  _changeMenu({ target }) {
    const href = target.closest('.menu__link').getAttribute('href');
    if (href === '/logout') {
      this._handleLogout();
      return;
    }
    this.props.switchURL(href);
  }

  _handleLogout() {
    removeLocalStorageItem('userAccessToken');
    this.props.switchURL('/');
    this.props.showSnackbar('로그아웃 되었습니다 !');
  }
}

export default Header;
