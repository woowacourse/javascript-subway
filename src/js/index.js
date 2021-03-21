// import '../css/index.css';
import { $ } from './utils/DOM.js';
import {
  HOME_LINK,
  AUTHENTICATED_LINK,
  UNAUTHENTICATED_LINK,
} from './constants/header.js';
import { headerTemplate } from './components/header.js';
import Login from './components/login/index.js';
import Signup from './components/signup/index.js';
import Section from './components/section/index.js';
import Line from './components/line/index.js';
import Station from './components/station/index.js';
import accessTokenManager from './states/AccessTokenManager.js';
import isLogin from './hook/isLogin.js';

const PrivateRouter = (Station) => {
  if (localStorage.getItem('accessToken')) {
    return Station;
  }

  return Login;
};

class App {
  constructor() {
    this.components = {
      [HOME_LINK.ROUTE]: PrivateRouter(Station),
      [AUTHENTICATED_LINK.STATION.ROUTE]: PrivateRouter(Station),
      [AUTHENTICATED_LINK.LINE.ROUTE]: PrivateRouter(Line),
      [AUTHENTICATED_LINK.SECTION.ROUTE]: PrivateRouter(Section),
      // [NAVIGATION.ROUTE.MAP]: loginRequiredTemplate,
      // [NAVIGATION.ROUTE.SEARCH]: loginRequiredTemplate,
      [UNAUTHENTICATED_LINK.LOGIN.ROUTE]: Login,
      [UNAUTHENTICATED_LINK.SIGNUP.ROUTE]: Signup,
    };

    accessTokenManager.subscribe(this.renderHeader);

    this.renderHeader();
    this.addEventListeners();
  }

  renderHeader() {
    $('.js-header').innerHTML = headerTemplate(
      isLogin() ? AUTHENTICATED_LINK : UNAUTHENTICATED_LINK
    );
  }

  render(route) {
    new this.components[route]($('.js-main'));
  }

  addEventListeners() {
    window.addEventListener('popstate', (e) => {
      this.render(e.state.route);
    });

    $('#app').addEventListener('click', (e) => {
      const anchor = e.target.closest('.js-link');
      if (!anchor) return;

      e.preventDefault();

      if (anchor.href === AUTHENTICATED_LINK.LOGOUT.ROUTE) {
        localStorage.clear();
      }

      const route = anchor.getAttribute('href');
      history.pushState({ route }, null, route);
      this.render(route);
    });

    window.addEventListener('load', () => {
      this.render(location.pathname);
    });
  }
}

new App();
