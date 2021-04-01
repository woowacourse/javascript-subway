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
  }

  selectDOM() {
    this.navigation = $(SELECTOR.NAVIGATION);
    this.navButtons = $(SELECTOR.NAV_BUTTON);
  }

  update() {
    if (this.store.isLoggedIn) {
      this.navigation.classList.remove('d-none');
      this.selectButton();
    } else {
      this.navigation.classList.add('d-none');
    }
  }

  bindEvents() {
    this.navigation.addEventListener('click', this.handleNavigation.bind(this));
    $(SELECTOR.LOGOUT_BUTTON).addEventListener('click', this.logout.bind(this));
  }

  async handleNavigation(event) {
    event.preventDefault();

    if (!event.target.matches(`${SELECTOR.NAVIGATION} button`)) return;

    const path = event.target.closest('a').getAttribute('href');

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

  logout(event) {
    event.preventDefault();

    this.store.updateLoggedIn(false);
    routeTo(getAvailablePath('/login', this.store.isLoggedIn));
    removeCookie('token');
  }
}
