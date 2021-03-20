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
    this.logButton.classList.remove('selected');
  }

  bindEvents() {
    this.navigation.addEventListener('click', async (e) => {
      if (!e.target.matches(`${SELECTOR.NAVIGATION} button`)) return;

      e.preventDefault();
      const path = e.target.closest('a').getAttribute('href');

      if (e.target.dataset.action === 'logout') {
        this.store.updateLoggedIn(false);
        removeCookie('token');
      }

      await render(path, this.store.userSession.isLoggedIn);

      this.selectButton(e.target.id);
    });
  }

  selectButton(id) {
    this.navButtons.forEach((button) => {
      if (button.id === id) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  }
}
