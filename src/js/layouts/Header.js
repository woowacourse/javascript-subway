import { headerTemplate } from './headerTemplate.js';

class Header {
  constructor(props) {
    this.props = props;
    this.userToken = null;
  }

  init() {
    this.fetchUserToken();
    this.initDOM();
    this.selectDOM();
    this.handleMenu();
  }

  fetchUserToken() {
    this.userToken = this.props.isLoggedIn; // 모델에서 가져오기
  }

  initDOM() {
    this.$target = document.querySelector('header');
    this.$target.innerHTML = headerTemplate(this.userToken);
  }

  selectDOM() {
    this.$menu = document.querySelector('.menu');
  }

  handleMenu() {
    this.$menu.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.tagName !== 'BUTTON') return;

      this._changeMenu(e);
    });
  }

  _changeMenu({ target }) {
    const href = target.closest('.menu__link').getAttribute('href');
    this.props.switchURL(href);
  }
}

export default Header;
