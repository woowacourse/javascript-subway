import $ from '../utils/querySelector.js';
import HomeComponent from './HomeComponent.js';
import LoginComponent from './LoginComponent.js';
import SignupComponent from './SignupComponent.js';
import MyInfoComponent from './MyInfoComponent.js';
import Page from './Page.js';
import State from './State.js';
import { ID_SELECTOR, KEYWORD, STATE_KEY } from '../constants.js';
import { show, hide } from '../utils/DOM.js';
class AppPage extends Page {
  constructor(props) {
    super(props);

    this.state = new State({
      loginResponse: {
        accessToken: '',
      },
    });

    this._routingUrl = {
      //TODO: 주소 상수화
      '/': new HomeComponent(),
      '/pages/login.html': new LoginComponent({
        route: this.route,
        appState: this.state,
      }),
      '/pages/signup.html': new SignupComponent({ route: this.route }),
      '/pages/myInfo.html': new MyInfoComponent({ appState: this.state }),
    };

    this.state.setListener(
      STATE_KEY.LOGIN_RESPONSE,
      this.handleNavButtonToChange
    );
    this.state.setListener(STATE_KEY.LOGIN_RESPONSE, this.handlePageToRedirect);
  }

  initEvent() {
    window.addEventListener('popstate', e => {
      this.route(e.state.path, false);
    });

    $('header').addEventListener('click', this._onAnchorClicked);
    $(`#${ID_SELECTOR.NAV_LOGOUT}`).addEventListener('click', this.#onLogout);
  }

  #onLogout = () => {
    this.state.setData({
      loginResponse: {
        accessToken: KEYWORD.LOGOUT,
      },
    });
  };

  handleNavButtonToChange = loginResponse => {
    const isLogout = loginResponse.accessToken === KEYWORD.LOGOUT;

    if (isLogout) {
      this.#renderGuestNavBar();
      return;
    }

    this.#renderUserNavBar();
  };

  handlePageToRedirect = loginResponse => {
    const isLogout = loginResponse.accessToken === KEYWORD.LOGOUT;

    if (isLogout) {
      this.route('/pages/login.html');
      return;
    }

    this.route('/');
  };

  #renderUserNavBar() {
    show(`#${ID_SELECTOR.NAV_LINE}`);
    show(`#${ID_SELECTOR.NAV_STATION}`);
    show(`#${ID_SELECTOR.NAV_SECTION}`);
    show(`#${ID_SELECTOR.NAV_FULL_MAP}`);
    show(`#${ID_SELECTOR.NAV_SEARCH}`);
    show(`#${ID_SELECTOR.NAV_MY_INFO}`);
    show(`#${ID_SELECTOR.NAV_LOGOUT}`);

    hide(`#${ID_SELECTOR.NAV_LOGIN}`);
  }

  #renderGuestNavBar() {
    hide(`#${ID_SELECTOR.NAV_LINE}`);
    hide(`#${ID_SELECTOR.NAV_STATION}`);
    hide(`#${ID_SELECTOR.NAV_SECTION}`);
    hide(`#${ID_SELECTOR.NAV_FULL_MAP}`);
    hide(`#${ID_SELECTOR.NAV_SEARCH}`);
    hide(`#${ID_SELECTOR.NAV_MY_INFO}`);
    hide(`#${ID_SELECTOR.NAV_LOGOUT}`);

    show(`#${ID_SELECTOR.NAV_LOGIN}`);
  }
}

export default AppPage;
