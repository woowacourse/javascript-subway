import '../css/index.css';
import { $ } from './utils/DOM.js';
import {
  AUTHENTICATED_LINK,
  UNAUTHENTICATED_LINK,
  HOME_LINK,
} from './constants/link.js';
import { headerTemplate } from './components/header.js';
import AccessTokenManager from './stateManagers/AccessTokenManager.js';
import isLogin from './hook/isLogin.js';
import RouteManager from './stateManagers/RouteManager.js';
import request from './utils/fetch.js';
import { PATH } from './constants/url.js';
import { ERROR_MESSAGE } from './constants/message.js';
import Login from './components/login/index.js';
import Signup from './components/signup/index.js';
import Section from './components/section/index.js';
import Line from './components/line/index.js';
import Station from './components/station/index.js';
import getFetchParams from './api/getFetchParams.js';

class App {
  constructor(stateManagers) {
    this.stateManagers = stateManagers;
    this.components = {
      [HOME_LINK.ROUTE]: () => this.privateRouter(Station),
      [AUTHENTICATED_LINK.STATION.ROUTE]: () => this.privateRouter(Station),
      [AUTHENTICATED_LINK.LINE.ROUTE]: () => this.privateRouter(Line),
      [AUTHENTICATED_LINK.SECTION.ROUTE]: () => this.privateRouter(Section),
      // TODO: 3단계 요구사항
      // [NAVIGATION.ROUTE.MAP]: loginRequiredTemplate,
      // [NAVIGATION.ROUTE.SEARCH]: loginRequiredTemplate,
      [UNAUTHENTICATED_LINK.LOGIN.ROUTE]: () => this.publicRouter(Login),
      [UNAUTHENTICATED_LINK.SIGNUP.ROUTE]: () => this.publicRouter(Signup),
    };

    this.stateManagers.accessToken.subscribe(this.renderHeader);
    this.stateManagers.route.subscribe(this.renderComponent.bind(this));

    this.renderHeader();
    this.addEventListeners();
  }

  privateRouter(Component) {
    if (isLogin()) {
      return Component;
    }

    history.replaceState(
      { route: UNAUTHENTICATED_LINK.LOGIN.ROUTE },
      null,
      UNAUTHENTICATED_LINK.LOGIN.ROUTE
    );
    return Login;
  }

  publicRouter(Component) {
    if (!isLogin()) {
      return Component;
    }

    history.replaceState(
      { route: AUTHENTICATED_LINK.STATION.ROUTE },
      null,
      AUTHENTICATED_LINK.STATION.ROUTE
    );
    return Station;
  }

  renderComponent(path = location.pathname) {
    const component = this.components[path]();
    new component($('.js-main'), this.stateManagers);
  }

  renderHeader() {
    $('.js-header').innerHTML = headerTemplate(
      isLogin() ? AUTHENTICATED_LINK : UNAUTHENTICATED_LINK
    );
  }

  addEventListeners() {
    window.addEventListener('popstate', (e) => {
      this.renderComponent(e.state.route);
    });

    $('#app').addEventListener('click', (e) => {
      const anchor = e.target.closest('.js-link');
      if (!anchor) return;

      e.preventDefault();

      const route = anchor.getAttribute('href');
      if (route === AUTHENTICATED_LINK.LOGOUT.ROUTE) {
        this.fireAccessToken();

        this.stateManagers.route.goPage(UNAUTHENTICATED_LINK.LOGIN.ROUTE);

        return;
      }

      const isLoginOrSignupRoute = [
        UNAUTHENTICATED_LINK.LOGIN.ROUTE,
        UNAUTHENTICATED_LINK.SIGNUP.ROUTE,
      ].includes(route);

      if (!isLoginOrSignupRoute && !this.isValidAccessToken()) {
        this.fireAccessToken();
      }

      this.stateManagers.route.goPage(route);
    });

    window.addEventListener('load', () => {
      history.replaceState(
        { route: location.pathname },
        null,
        location.pathname
      );

      this.renderComponent(location.pathname);
    });
  }

  fireAccessToken() {
    this.stateManagers.accessToken.clearToken();
  }

  async isValidAccessToken() {
    try {
      const accessToken = this.stateManagers.accessToken.getToken();
      const params = getFetchParams({ path: PATH.MEMBERS.ME, accessToken });
      const response = await request.get(params);

      if (!response.ok) throw Error(ERROR_MESSAGE.INVALID_TOKEN);
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }
}

new App({
  accessToken: new AccessTokenManager(),
  route: new RouteManager(),
});
