import { $ } from '../../utils/dom.js';
import routeTo from '../../router.js';
import { SELECTOR, BUTTON_NAME } from '../../constants/constants.js';
import { removeCookie } from '../../utils/cookie.js';
import getAvailablePath from '../../utils/path.js';

export default class NavigationBar {
  constructor(store) {
    this.store = store;
  }

  init() {
    this.store.subscribe(this);

    this.selectDOM();
    this.selectButton();
    this.bindEvents();
    this.setLogButton();
  }

  selectDOM() {
    this.navigation = $(SELECTOR.NAVIGATION);
    this.navButtons = $(SELECTOR.NAV_BUTTON);
    this.logButton = $(SELECTOR.NAV_LOG_BUTTON);
  }

  update() {
    this.setLogButton();
  }

  bindEvents() {
    this.navigation.addEventListener('click', this.handleNavigation.bind(this));
  }

  setLogButton() {
    const isLoggedIn = this.store.isLoggedIn;

    this.logButton.textContent = isLoggedIn ? BUTTON_NAME.LOGOUT : BUTTON_NAME.LOGIN;
    this.logButton.setAttribute('data-action', isLoggedIn ? 'logout' : 'login');

    if (isLoggedIn) {
      this.logButton.classList.remove('selected');
    }
  }

  async handleNavigation(event) {
    event.preventDefault();

    if (!event.target.matches(`${SELECTOR.NAVIGATION} button`)) return;

    const path = event.target.closest('a').getAttribute('href');

    if (event.target.dataset.action === 'logout') {
      this.logout();
    }

    routeTo(getAvailablePath(path, this.store.isLoggedIn));

    this.selectButton();
  }

  selectButton() {
    this.navButtons.forEach((button) => {
      const href = button.closest('a').getAttribute('href');

      if (href === location.pathname) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  }

  logout() {
    this.store.updateLoggedIn(false);
    removeCookie('token');
  }
}
