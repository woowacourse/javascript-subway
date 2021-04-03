import '../css/index.css';
import { $ } from './utils/DOM';
import {
  AUTHENTICATED_LINK,
  UNAUTHENTICATED_LINK,
  HOME_LINK,
} from './constants/link';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Section from './Pages/Section';
import Line from './Pages/Line';
import Station from './Pages/Station';
import Map from './Pages/Map';

const initalState = {
  stations: [],
  lines: [],
};

class Router {
  constructor({ props: { goPage, isLogin, setIsLogin } }) {
    this.pageComponents = {
      Login: new Login({
        parentNode: $('.js-main'),
        props: {
          goPage,
          setIsLogin,
        },
      }),
      Signup: new Signup({
        parentNode: $('.js-main'),
        props: {
          goPage,
          setIsLogin,
        },
      }),
      Station: new Station({
        parentNode: $('.js-main'),
        state: initalState,
        props: {
          goPage,
          setIsLogin,
        },
      }),
      Line: new Line({
        parentNode: $('.js-main'),
        state: initalState,
        props: {
          goPage,
          setIsLogin,
        },
      }),
      Section: new Section({
        parentNode: $('.js-main'),
        state: initalState,
        props: {
          goPage,
          setIsLogin,
        },
      }),
      Map: new Map({
        parentNode: $('.js-main'),
        state: initalState,
      }),
    };

    this.route = {
      [HOME_LINK.PATH]: () => {
        return this.privateRoute(this.pageComponents.Station);
      },
      [AUTHENTICATED_LINK.STATION.PATH]: () => {
        return this.privateRoute(this.pageComponents.Station);
      },
      [AUTHENTICATED_LINK.LINE.PATH]: () => {
        return this.privateRoute(this.pageComponents.Line);
      },
      [AUTHENTICATED_LINK.SECTION.PATH]: () => {
        return this.privateRoute(this.pageComponents.Section);
      },
      [AUTHENTICATED_LINK.MAP.PATH]: () => {
        return this.privateRoute(this.pageComponents.Map);
      },
      [UNAUTHENTICATED_LINK.LOGIN.PATH]: () => {
        return this.publicRoute(this.pageComponents.Login);
      },
      [UNAUTHENTICATED_LINK.SIGNUP.PATH]: () => {
        return this.publicRoute(this.pageComponents.Signup);
      },
    };

    this.isLogin = isLogin;
  }

  privateRoute(Component) {
    if (this.isLogin()) {
      return Component;
    }

    history.replaceState(
      { path: UNAUTHENTICATED_LINK.LOGIN.PATH },
      null,
      UNAUTHENTICATED_LINK.LOGIN.PATH
    );

    return this.pageComponents.Login;
  }

  publicRoute(Component) {
    if (!this.isLogin()) {
      return Component;
    }

    history.replaceState(
      { path: AUTHENTICATED_LINK.STATION.PATH },
      null,
      AUTHENTICATED_LINK.STATION.PATH
    );

    return this.pageComponents.Station;
  }
}

export default Router;
