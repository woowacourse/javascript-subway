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
    this.handleMenu();
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
