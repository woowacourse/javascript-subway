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
import Login from './components/login/index.js';
import Signup from './components/signup/index.js';
import Section from './components/section/index.js';
import Line from './components/line/index.js';
import Station from './components/station/index.js';
import Component from './core/Component.js';

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
      // TODO: 3단계 요구사항
      // [NAVIGATION.ROUTE.MAP]: loginRequiredTemplate,
      // [NAVIGATION.ROUTE.SEARCH]: loginRequiredTemplate,
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

  // Login 하지 않으면 updateSubwayState가 필요없어서 나머지는 render
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

      // const isLoginOrSignupRoute = [
      //   UNAUTHENTICATED_LINK.LOGIN.ROUTE,
      //   UNAUTHENTICATED_LINK.SIGNUP.ROUTE,
      // ].includes(route);

      // if (!isLoginOrSignupRoute && !this.isValidAccessToken()) {
      //   this.fireAccessToken();
      // }

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

  // async isValidAccessToken() {
  //   try {
  //     const accessToken = this.stateManagers.accessToken.getToken();
  //     const params = getFetchParams({ path: PATH.MEMBERS.ME, accessToken });
  //     const response = await request.get(params);
  //     const response = await pb.get(params);

  //     if (!response.ok) throw Error(ERROR_MESSAGE.INVALID_TOKEN);
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }

  //   return true;
  // }
}

const stateManagers = {
  accessToken: new AccessTokenManager(),
  route: new RouteManager(),
};

const initalState = {
  stations: [],
  lines: [],
};

/* 00. 앱이 실행됨.
  실행되면서 각 페이지가 한 번씩 생성됨.
  이 페이지들은 나중에 render를 통해 새로운 데이터로 페이지를 그려줌
 */
new App(
  $('#app'),
  stateManagers,
  {
    Login: new Login($('.js-main'), stateManagers),
    Signup: new Signup($('.js-main'), stateManagers),
    Station: new Station($('.js-main'), stateManagers),
    Line: new Line($('.js-main'), stateManagers),
    Section: new Section($('.js-main'), stateManagers),
  },
  initalState
);
