import '../css/index.css';
import { $ } from './utils/DOM';
import {
  AUTHENTICATED_LINK,
  UNAUTHENTICATED_LINK,
  HOME_LINK,
} from './constants/link';
import template from './template';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Section from './Pages/Section';
import Line from './Pages/Line';
import Station from './Pages/Station';
import Component from './core/Component';
import { publicApis } from './api';
import { ERROR_MESSAGE } from './constants/message';

class App extends Component {
  constructor(parentNode, childComponents, state) {
    super(parentNode, childComponents, state);
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

    this.checkLogin();

    this.setChildProps('Login', {
      goPage: this.goPage.bind(this),
      setIsLogin: this.setIsLogin.bind(this),
    });
    this.setChildProps('Signup', { goPage: this.goPage.bind(this) });
  }

  async checkLogin() {
    this.setIsLogin(await this.isValidAccessToken());
  }

  setIsLogin(isLogin) {
    this.setState({ ...this.state, isLogin });
  }

  renderSelf() {
    $('.js-header').innerHTML = template(
      this.state.isLogin ? AUTHENTICATED_LINK : UNAUTHENTICATED_LINK
    );
  }

  privateRouter(Component) {
    if (this.state.isLogin) {
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
    if (!this.state.isLogin) {
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

    // 탭을 빠르게 전환시 데이터 응답 이후 기존탭을 그리는 현상이 나타남
    component.render();
    if (this.state.isLogin) {
      await component.updateSubwayState();
    }
  }

  async goPage(route) {
    history.pushState({ route }, null, route);
    this.renderComponent(route);
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
        this.setState({ ...this.state, isLogin: false });
        this.goPage(UNAUTHENTICATED_LINK.LOGIN.ROUTE);

        return;
      }

      // const isLoginOrSignupRoute = [
      //   UNAUTHENTICATED_LINK.LOGIN.ROUTE,
      //   UNAUTHENTICATED_LINK.SIGNUP.ROUTE,
      // ].includes(route);

      // if (!isLoginOrSignupRoute && !this.isValidAccessToken()) {
      //   this.fireAccessToken();
      // }

      this.goPage(route);
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

  async isValidAccessToken() {
    try {
      const accessToken = localStorage.getItem('accessToken') || '';
      const response = await publicApis.me({ accessToken });

      if (!response.ok) throw Error(ERROR_MESSAGE.INVALID_TOKEN);
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

/* 00. 앱이 실행됨.
  실행되면서 각 페이지가 한 번씩 생성됨.
  이 페이지들은 나중에 render를 통해 새로운 데이터로 페이지를 그려줌
 */
const app = new App({
  parentNode: $('#app'),
  childComponents: {
    Login: new Login({
      parentNode: $('.js-main'),
      state: { ...initalState.stations, ...initalState.lines },
    }),
    Signup: new Signup({
      parentNode: $('.js-main'),
      state: { ...initalState.stations, ...initalState.lines },
    }),
    Station: new Station({
      parentNode: $('.js-main'),
      state: { ...initalState.stations, ...initalState.lines },
    }),
    Line: new Line({
      parentNode: $('.js-main'),
      state: { ...initalState.stations, ...initalState.lines },
    }),
    Section: new Section({
      parentNode: $('.js-main'),
      state: { ...initalState.stations, ...initalState.lines },
    }),
  },
  state: initalState,
});

app.render();
