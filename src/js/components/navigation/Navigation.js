import Component from '../../core/Component.js';
import { $, $$, showElement, hideElement } from '../../utils/index.js';
import { LOCAL_STORAGE_KEY } from '../../constants/index.js';

export default class Navigation extends Component {
  constructor({ changeTemplate }) {
    super();
    this.changeTemplate = changeTemplate;
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
      this.changeTemplate('/');
      history.pushState({ url: '/' }, null, '/');
    }

    const url = e.target.closest('.navigation-link').getAttribute('href');
    await this.changeTemplate(url);
    Navigation.changeSelectedButtonColor(e.target);
    history.pushState({ url }, null, url);
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

  static changeSelectedButtonColor(target = '') {
    $$('.navigation-button').forEach((button) =>
      button.classList.remove('bg-cyan-100'),
    );

    if (target.id === 'navigation-main' || !target) {
      return;
    }

    target.classList.add('bg-cyan-100');
  }
}
