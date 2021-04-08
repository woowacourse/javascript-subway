import '@fortawesome/fontawesome-free/js/all.js';
import '../../node_modules/@fortawesome/fontawesome-svg-core/styles.css';
import '../css/index.css';
import { $ } from './utils/DOM.js';
import {
  AUTHENTICATED_LINK,
  UNAUTHENTICATED_LINK,
  HOME_LINK,
} from './constants/link.js';
import { headerTemplate } from './components/header.js';
import LocalStorageManager from './stateManagers/LocalStorageManager.js';
import isLogin from './hook/isLogin.js';
import RouteManager from './stateManagers/RouteManager.js';
import { PATH } from './constants/url.js';
import Login from './components/login/index.js';
import Signup from './components/signup/index.js';
import Section from './components/section/index.js';
import Line from './components/line/index.js';
import Map from './components/map/index.js';
import Station from './components/station/index.js';
import getFetchParams from './api/getFetchParams.js';
import Component from './core/Component.js';
import api from './api/requestHttp';

class App extends Component {
  constructor(parentNode, stateManagers, childComponents, state) {
    super(parentNode, stateManagers, childComponents, state);
    this.routeComponents = {
      [HOME_LINK.ROUTE]: () => {
        return this.privateRouter(this.childComponents.Station);
      },
      [AUTHENTICATED_LINK.STATION.ROUTE]: () => {
        return this.privateRouter(this.childComponents.Station);
      },
      [AUTHENTICATED_LINK.LINE.ROUTE]: () => {
        return this.privateRouter(this.childComponents.Line);
      },
      [AUTHENTICATED_LINK.SECTION.ROUTE]: () => {
        return this.privateRouter(this.childComponents.Section);
      },
      [AUTHENTICATED_LINK.MAP.ROUTE]: () => {
        return this.privateRouter(this.childComponents.Map);
      },
      [UNAUTHENTICATED_LINK.LOGIN.ROUTE]: () => {
        return this.publicRouter(this.childComponents.Login);
      },
      [UNAUTHENTICATED_LINK.SIGNUP.ROUTE]: () => {
        return this.publicRouter(this.childComponents.Signup);
      },
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

    return this.childComponents.Login;
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

    return this.childComponents.Station;
  }

  async renderComponent(path = location.pathname) {
    const component = this.routeComponents[path]();

    isLogin() ? await component.updateSubwayState() : component.render();
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

    $('#app').addEventListener('click', async (e) => {
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

      const accessToken = this.stateManagers.accessToken.getToken();
      const params = getFetchParams({ path: PATH.MEMBERS.ME, accessToken });
      if (!isLoginOrSignupRoute && !(await api.isValidAccessToken(params))) {
        alert('다시 로그인 해주세요.');
        this.fireAccessToken();

        this.stateManagers.route.goPage(UNAUTHENTICATED_LINK.LOGIN.ROUTE);
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
}

const stateManagers = {
  accessToken: new LocalStorageManager(),
  route: new RouteManager(),
};

const initalState = {
  stations: [],
  lines: [],
};

new App(
  $('#app'),
  stateManagers,
  {
    Login: new Login($('.js-main'), stateManagers),
    Signup: new Signup($('.js-main'), stateManagers),
    Station: new Station($('.js-main'), stateManagers),
    Line: new Line($('.js-main'), stateManagers),
    Section: new Section($('.js-main'), stateManagers),
    Map: new Map($('.js-main'), stateManagers),
  },
  initalState
);
