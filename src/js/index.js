// import '../css/index.css';
import { $ } from './utils/DOM.js';
import {
  AUTHENTICATED_LINK,
  UNAUTHENTICATED_LINK,
} from './constants/header.js';
import { headerTemplate } from './components/header.js';
import accessTokenManager from './stateManagers/AccessTokenManager.js';
import isLogin from './hook/isLogin.js';
import routeManager from './stateManagers/RouteManager.js';

class App {
  constructor() {
    this.accessTokenManager = accessTokenManager;
    this.routeManager = routeManager;

    this.accessTokenManager.subscribe(this.renderHeader);

    this.renderHeader();
    this.addEventListeners();
  }

  renderHeader() {
    $('.js-header').innerHTML = headerTemplate(
      isLogin() ? AUTHENTICATED_LINK : UNAUTHENTICATED_LINK
    );
  }

  addEventListeners() {
    window.addEventListener('popstate', (e) => {
      this.routeManager.setRoute(e.state.route);
    });

    $('#app').addEventListener('click', (e) => {
      const anchor = e.target.closest('.js-link');
      if (!anchor) return;

      e.preventDefault();

      const route = anchor.getAttribute('href');
      if (route === AUTHENTICATED_LINK.LOGOUT.ROUTE) {
        localStorage.removeItem('accessToken');
        this.accessTokenManager.clearToken();

        this.routeManager.setRoute(UNAUTHENTICATED_LINK.LOGIN.ROUTE);

        return;
      }

      this.routeManager.setRoute(route);
    });

    window.addEventListener('load', () => {
      this.routeManager.setRoute(location.pathname);
    });
  }

  fireToken() {
    localStorage.removeItem('accessToken');
    accessTokenManager.clearToken();
  }
}

new App();
