import { $ } from './utils/DOM';
import {
  AUTHENTICATED_LINK,
  HOME_LINK,
  UNAUTHENTICATED_LINK,
} from './constants/link';
import Component from './core/Component';
import Apis from './api';
import NavBar from './Components/NavBar';
import LOCAL_STORAGE_KEY from './constants/localStorage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Station from './Pages/Station';
import Line from './Pages/Line';
import Section from './Pages/Section';
import SubwayMap from './Pages/SubwayMap';
import Router from './Router';

class App extends Component {
  constructor({ parentNode, state, Router }) {
    super({ parentNode, state });

    this.updateSubwayState = this.updateSubwayState.bind(this);

    this.Router = Router;
    this.pageComponents = {
      Login: new Login({
        parentNode: $('.js-main'),
      }),
      Signup: new Signup({
        parentNode: $('.js-main'),
      }),
      Station: new Station({
        parentNode: $('.js-main'),
        props: { updateSubwayState: this.updateSubwayState },
      }),
      Line: new Line({
        parentNode: $('.js-main'),
        props: { updateSubwayState: this.updateSubwayState },
      }),
      Section: new Section({
        parentNode: $('.js-main'),
        props: { updateSubwayState: this.updateSubwayState },
      }),
      SubwayMap: new SubwayMap({
        parentNode: $('.js-main'),
        props: { updateSubwayState: this.updateSubwayState },
      }),
    };

    this.childComponents = {
      navBar: new NavBar({
        parentNode: $('.js-header'),
      }),
      ...this.pageComponents,
    };

    this.Router.route = {
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
  }

  privateRoute(Component) {
    if (this.state.isLogin) {
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
    if (!this.state.isLogin) {
      return Component;
    }

    history.replaceState(
      { path: AUTHENTICATED_LINK.STATION.PATH },
      null,
      AUTHENTICATED_LINK.STATION.PATH
    );

    return this.pageComponents.Station;
  }

  async checkLogin() {
    this.setLoginStatus(await this.isValidAccessToken());
  }

  setLoginStatus(isLogin) {
    this.setState({ ...this.state, isLogin });
  }

  async isValidAccessToken() {
    try {
      await Apis.members.me();
    } catch (error) {
      console.error(error.message);
      return false;
    }

    return true;
  }

  addStaticEventListeners() {
    window.addEventListener('popstate', (e) => {
      this.Router.renderComponent(e.state.path);
    });

    window.addEventListener('load', () => {
      history.replaceState(
        { path: location.pathname },
        null,
        location.pathname
      );

      this.Router.renderComponent(location.pathname);
    });

    window.addEventListener('click', (e) => {
      const anchor = e.target.closest('.js-link');
      if (!anchor) return;

      e.preventDefault();

      const path = anchor.getAttribute('href');
      if (path === AUTHENTICATED_LINK.LOGOUT.PATH) {
        localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);
        this.setLoginStatus(false);
        this.Router.goPage(UNAUTHENTICATED_LINK.LOGIN.PATH);

        return;
      }

      this.Router.goPage(path);
    });
  }

  async updateSubwayState() {
    this.setState({ ...this.state, ...(await Apis.getStationAndLine()) });
  }
}

const initalState = {
  loginStatus: false,
  stations: [],
  lines: [],
};

const app = new App({
  parentNode: $('#app'),
  state: initalState,
  Router,
});

export default app;
