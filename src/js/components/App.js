import { $ } from '../utils/DOM.js';
import {
  AUTHENTICATED_LINK,
  UNAUTHENTICATED_LINK,
  HOME_LINK,
} from '../constants/link.js';
import { headerTemplate } from './header.js';
import isLogin from '../hook/isLogin.js';
import request from '../utils/request.js';
import { PATH } from '../constants/url.js';
import getFetchParams from '../api/getFetchParams.js';
import { ERROR_MESSAGE } from '../constants/message.js';
import Component from '../core/Component.js';
import fetchGetSubwayState from '../api/fetchGetSubwayState.js';

class App extends Component {
  constructor(parentNode, stateManagers, childComponents) {
    super(parentNode, stateManagers, childComponents);

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
    this.stateManagers.route.subscribe(this.selectComponent.bind(this));
    this.stateManagers.subwayState.subscribe(this.renderComponent.bind(this));

    this.selectedComponent;
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

  async renderSelf() {
    this.renderHeader();
    this.selectComponent();
  }

  renderHeader() {
    $('.js-header').innerHTML = headerTemplate(
      isLogin() ? AUTHENTICATED_LINK : UNAUTHENTICATED_LINK
    );
  }

  async selectComponent(path = location.pathname) {
    this.selectedComponent = this.routeComponents[path]();

    if (isLogin()) {
      this.stateManagers.subwayState.setSubwayState(
        await fetchGetSubwayState(this.stateManagers.accessToken.getToken())
      );
    }

    this.renderComponent();
  }

  renderComponent() {
    this.selectedComponent.render();
  }

  addEventListeners() {
    this.parentNode.addEventListener('click', (e) => {
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

export default App;
