import '../css/index.css';
import { $ } from './utils/DOM';
import {
  AUTHENTICATED_LINK,
  UNAUTHENTICATED_LINK,
  HOME_LINK,
} from './constants/link';
import template from './Components/NavBar/template';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Section from './Pages/Section';
import Line from './Pages/Line';
import Station from './Pages/Station';
import Component from './core/Component';
import { publicApis } from './api';
import NavBar from './Components/NavBar';

class App extends Component {
  constructor({ parentNode, state }) {
    super({ parentNode, state });
    this.pageComponents = {
      Login: new Login({
        parentNode: $('.js-main'),
        props: {
          goPage: this.goPage.bind(this),
          setIsLogin: this.setIsLogin.bind(this),
        },
      }),
      Signup: new Signup({
        parentNode: $('.js-main'),
        props: {
          goPage: this.goPage.bind(this),
          setIsLogin: this.setIsLogin.bind(this),
        },
      }),
      Station: new Station({
        parentNode: $('.js-main'),
        state,
        props: {
          goPage: this.goPage.bind(this),
          setIsLogin: this.setIsLogin.bind(this),
        },
      }),
      Line: new Line({
        parentNode: $('.js-main'),
        state,
        props: {
          goPage: this.goPage.bind(this),
          setIsLogin: this.setIsLogin.bind(this),
        },
      }),
      Section: new Section({
        parentNode: $('.js-main'),
        state,
        props: {
          goPage: this.goPage.bind(this),
          setIsLogin: this.setIsLogin.bind(this),
        },
      }),
    };

    this.router = {
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
      // TODO: 3단계 요구사항
      // [NAVIGATION.ROUTE.MAP]: loginRequiredTemplate,
      // [NAVIGATION.ROUTE.SEARCH]: loginRequiredTemplate,
      [UNAUTHENTICATED_LINK.LOGIN.PATH]: () => {
        return this.publicRoute(this.pageComponents.Login);
      },
      [UNAUTHENTICATED_LINK.SIGNUP.PATH]: () => {
        return this.publicRoute(this.pageComponents.Signup);
      },
    };

    this.childComponents = {
      navBar: new NavBar({
        parentNode: $('.js-header'),
        props: {
          goPage: this.goPage.bind(this),
          setIsLogin: this.setIsLogin.bind(this),
        },
      }),
    };

    this.checkLogin();
  }

  async checkLogin() {
    this.setIsLogin(await this.isValidAccessToken());
  }

  setIsLogin(isLogin) {
    this.setState({ ...this.state, isLogin });
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

    return this.childComponents.Login;
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

    return this.childComponents.Station;
  }

  async renderComponent(path = location.pathname) {
    const component = this.router[path]();

    // 탭을 빠르게 전환시 데이터 응답 이후 기존탭을 그리는 현상이 나타남
    component.render();
    await component.updateSubwayState?.();
  }

  async goPage(path) {
    history.pushState({ path }, null, path);
    this.renderComponent(path);
  }

  addEventListeners() {
    window.addEventListener('popstate', (e) => {
      this.renderComponent(e.state.path);
    });

    window.addEventListener('load', () => {
      history.replaceState(
        { path: location.pathname },
        null,
        location.pathname
      );

      this.renderComponent(location.pathname);
    });
  }

  async isValidAccessToken() {
    const accessToken = localStorage.getItem('accessToken') || '';
    try {
      await publicApis.me(accessToken);
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }
}

const initalState = {
  stations: [],
  lines: [],
  isLogin: false,
};

new App({
  parentNode: $('#app'),
  state: initalState,
});
