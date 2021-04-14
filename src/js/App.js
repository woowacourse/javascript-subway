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
import Map from './Pages/Map';

class App extends Component {
  constructor({ parentNode, state, Router }) {
    super({ parentNode, state });

    this.childComponents = {
      navBar: new NavBar({
        parentNode: $('.js-header'),
      }),
    };

    this.Router = Router;

    this.Router.pageComponents = {
      Login: new Login({
        parentNode: $('.js-main'),
        props: {
          setIsLogin: this.setIsLogin.bind(this),
        },
      }),
      Signup: new Signup({
        parentNode: $('.js-main'),
        props: {
          setIsLogin: this.setIsLogin.bind(this),
        },
      }),
      Station: new Station({
        parentNode: $('.js-main'),
        state: { stations: [], lines: [] },
        props: {
          setIsLogin: this.setIsLogin.bind(this),
        },
      }),
      Line: new Line({
        parentNode: $('.js-main'),
        state: { stations: [], lines: [] },
        props: {
          setIsLogin: this.setIsLogin.bind(this),
        },
      }),
      Section: new Section({
        parentNode: $('.js-main'),
        state: { stations: [], lines: [] },
        props: {
          setIsLogin: this.setIsLogin.bind(this),
        },
      }),
      Map: new Map({
        parentNode: $('.js-main'),
        state: { stations: [], lines: [] },
      }),
    };

    this.Router.route = {
      [HOME_LINK.PATH]: () => {
        return this.privateRoute(this.Router.pageComponents.Station);
      },
      [AUTHENTICATED_LINK.STATION.PATH]: () => {
        return this.privateRoute(this.Router.pageComponents.Station);
      },
      [AUTHENTICATED_LINK.LINE.PATH]: () => {
        return this.privateRoute(this.Router.pageComponents.Line);
      },
      [AUTHENTICATED_LINK.SECTION.PATH]: () => {
        return this.privateRoute(this.Router.pageComponents.Section);
      },
      [AUTHENTICATED_LINK.MAP.PATH]: () => {
        return this.privateRoute(this.Router.pageComponents.Map);
      },
      [UNAUTHENTICATED_LINK.LOGIN.PATH]: () => {
        return this.publicRoute(this.Router.pageComponents.Login);
      },
      [UNAUTHENTICATED_LINK.SIGNUP.PATH]: () => {
        return this.publicRoute(this.Router.pageComponents.Signup);
      },
    };
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

    return this.Router.pageComponents.Login;
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

    return this.Router.pageComponents.Station;
  }

  async checkLogin() {
    this.setIsLogin(await this.isValidAccessToken());
  }

  isLogin() {
    return this.state.isLogin;
  }

  setIsLogin(isLogin) {
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
        this.setIsLogin(false);
        this.Router.goPage(UNAUTHENTICATED_LINK.LOGIN.PATH);

        return;
      }

      this.Router.goPage(path);
    });
  }
}

export default App;
