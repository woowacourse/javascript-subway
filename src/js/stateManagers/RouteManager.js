import { $ } from '../utils/DOM.js';
import {
  HOME_LINK,
  AUTHENTICATED_LINK,
  UNAUTHENTICATED_LINK,
} from '../constants/link.js';
import Login from '../components/login/index.js';
import Signup from '../components/signup/index.js';
import Section from '../components/section/index.js';
import Line from '../components/line/index.js';
import Station from '../components/station/index.js';
import isLogin from '../hook/isLogin.js';

class RouteManager {
  constructor() {
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
  }

  privateRouter(Component) {
    if (isLogin()) {
      return Component;
    }

    history.pushState(
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

    history.pushState(
      { route: AUTHENTICATED_LINK.STATION.ROUTE },
      null,
      AUTHENTICATED_LINK.STATION.ROUTE
    );
    return Station;
  }

  goPage(route) {
    history.pushState({ route }, null, route);
    this.render(route);
  }

  render(route) {
    const component = this.components[route]();
    new component($('.js-main'));
  }
}

const routeManager = new RouteManager();

export default routeManager;
