import { $ } from '../utils/DOM.js';
import {
  HOME_LINK,
  AUTHENTICATED_LINK,
  UNAUTHENTICATED_LINK,
} from '../constants/header.js';
import Login from '../components/login/index.js';
import Signup from '../components/signup/index.js';
import Section from '../components/section/index.js';
import Line from '../components/line/index.js';
import Station from '../components/station/index.js';
import isLogin from '../hook/isLogin.js';

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

class RouteManager {
  constructor() {
    this.route = '';
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
  }

  setRoute(route) {
    this.route = route;
    this.goPage();
  }

  goPage() {
    history.pushState({ route: this.route }, null, this.route);
    this.render();
  }

  render() {
    const component = this.components[this.route]();
    new component($('.js-main'));
  }
}

const routeManager = new RouteManager();

export default routeManager;
