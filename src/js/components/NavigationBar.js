import { $ } from '../utils/dom.js';
import { render } from '../../js/router.js';
import { SELECTOR } from '../constants/constants.js';
import { removeCookie } from '../utils/cookie.js';

export default class NavigationBar {
  constructor(store) {
    this.store = store;
  }

  init() {
    this.store.subscribe(this);

    this.selectDOM();
    this.selectButton(`${location.pathname.replace('/', '')}-nav-button`);
    this.setLogButton();
    this.bindEvents();
  }

  selectDOM() {
    this.navigation = $(SELECTOR.NAVIGATION);
    this.navButtons = $(SELECTOR.NAV_BUTTON);
    this.logButton = $(SELECTOR.NAV_LOG_BUTTON);
  }

  update() {
    this.setLogButton();
  }

  setLogButton() {
    const isLoggedIn = this.store.userSession.isLoggedIn;

    this.logButton.textContent = isLoggedIn ? '🔌 로그아웃' : '👤 로그인';
    this.logButton.setAttribute('data-action', isLoggedIn ? 'logout' : 'login');

    if (isLoggedIn) {
      this.logButton.classList.remove('selected');
    }
  }

  bindEvents() {
    this.navigation.addEventListener('click', this.handleNavigation.bind(this));
  }

  async handleNavigation(event) {
    event.preventDefault();

    if (!event.target.matches(`${SELECTOR.NAVIGATION} button`)) return;

    const path = event.target.closest('a').getAttribute('href');

    if (event.target.dataset.action === 'logout') {
      this.logout();
    }

    await render(path, this.store.userSession.isLoggedIn);

    this.selectButton(event.target.id);
  }

  logout() {
    this.store.updateLoggedIn(false);
    removeCookie('token');
  }

  selectButton(id) {
    if (!this.store.userSession.isLoggedIn && location.pathname !== '/login') {
      this.logButton.classList.remove('selected');
      return;
    }

    this.navButtons.forEach((button) => {
      if (button.id === id) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  }
}
