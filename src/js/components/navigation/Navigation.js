import Component from '../../core/Component.js';
import { $, $$, showElement, hideElement, showSnackbar, routeTo } from '../../utils/index.js';
import { LOCAL_STORAGE_KEY, SNACKBAR_MESSAGE } from '../../constants/index.js';

export default class Navigation extends Component {
  constructor() {
    super();
    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$header = $('header');
  }

  bindEvent() {
    this.$header.addEventListener('click', this.handleNavigation.bind(this));
  }

  async handleNavigation(e) {
    e.preventDefault();

    if (!e.target.classList.contains('btn')) {
      return;
    }

    if (e.target.id === 'navigation-logout-button') {
      localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
      routeTo('/');
      this.changeSelectedButtonColor();
      showSnackbar(SNACKBAR_MESSAGE.LOGOUT_SUCCESS);

      return;
    }

    const pathName = e.target.closest('.navigation-link').getAttribute('href');
    routeTo(pathName);
    this.changeSelectedButtonColor(e.target);
  }

  render(token = '') {
    if (token) {
      hideElement($('#navigation-login-button'));
      showElement($('#navigation-logout-button'));

      return;
    }

    showElement($('#navigation-login-button'));
    hideElement($('#navigation-logout-button'));
  }

  changeSelectedButtonColor(target = '') {
    $$('.navigation-button').forEach((button) => button.classList.remove('bg-cyan-100'));

    if (target.id === 'navigation-main' || !target) {
      return;
    }

    target.classList.add('bg-cyan-100');
  }
}
