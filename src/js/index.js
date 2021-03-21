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
import accessTokenManager from './stateManagers/AccessTokenManager.js';
import isLogin from './hook/isLogin.js';

const PrivateRouter = (Component) => {
  if (isLogin()) {
    return Component;
  }

  history.pushState(
    { route: UNAUTHENTICATED_LINK.LOGIN.ROUTE },
    null,
    UNAUTHENTICATED_LINK.LOGIN.ROUTE
  );
  return Login;
};

class App {
  constructor() {
    this.components = {
      [HOME_LINK.ROUTE]: () => PrivateRouter(Station),
      [AUTHENTICATED_LINK.STATION.ROUTE]: () => PrivateRouter(Station),
      [AUTHENTICATED_LINK.LINE.ROUTE]: () => PrivateRouter(Line),
      [AUTHENTICATED_LINK.SECTION.ROUTE]: () => PrivateRouter(Section),
      // [NAVIGATION.ROUTE.MAP]: loginRequiredTemplate,
      // [NAVIGATION.ROUTE.SEARCH]: loginRequiredTemplate,
      [UNAUTHENTICATED_LINK.LOGIN.ROUTE]: () => Login,
      [UNAUTHENTICATED_LINK.SIGNUP.ROUTE]: () => Signup,
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
    const component = this.components[route]();
    new component($('.js-main'));
  }

  addEventListeners() {
    window.addEventListener('popstate', (e) => {
      this.render(e.state.route);
    });

    $('#app').addEventListener('click', (e) => {
      const anchor = e.target.closest('.js-link');
      if (!anchor) return;

      e.preventDefault();

      const route = anchor.getAttribute('href');
      if (route === AUTHENTICATED_LINK.LOGOUT.ROUTE) {
        localStorage.removeItem('accessToken');
        accessTokenManager.clearToken();

        history.pushState(
          { route: UNAUTHENTICATED_LINK.LOGIN.ROUTE },
          null,
          UNAUTHENTICATED_LINK.LOGIN.ROUTE
        );
        this.render(UNAUTHENTICATED_LINK.LOGIN.ROUTE);

        return;
      }

      history.pushState({ route }, null, route);
      this.render(route);
    });

    window.addEventListener('load', () => {
      this.render(location.pathname);
    });
  }
}

new App();
