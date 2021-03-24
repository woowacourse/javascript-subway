import $ from '../utils/querySelector.js';
import HomeComponent from './HomeComponent.js';
import StationComponent from './StationComponent.js';
import LoginComponent from './LoginComponent.js';
import SignupComponent from './SignupComponent.js';
import MyInfoComponent from './MyInfoComponent.js';
import Page from './Page.js';
import State from './State.js';
import { ID_SELECTOR, KEYWORD, STATE_KEY, URL } from '../constants.js';
import { show, hide } from '../utils/DOM.js';
class AppPage extends Page {
  constructor(props) {
    super(props);
  }

  initState() {
    this.state = new State({
      [STATE_KEY.ACCESS_TOKEN]: KEYWORD.LOGOUT,
    });

    this.state.setListener(
      STATE_KEY.ACCESS_TOKEN,
      this.handleNavButtonToChange
    );
    this.state.setListener(STATE_KEY.ACCESS_TOKEN, this.handlePageToRedirect);

    //TODO: 라우트를 initRoute 같은 걸로 나눌 수 있을까?
    this._router = {
      [URL.HOME]: new HomeComponent(),
      [URL.STATION]: new StationComponent({ appState: this.state }),
      [URL.LOGIN]: new LoginComponent({
        route: this.route,
        appState: this.state,
      }),
      [URL.SIGNUP]: new SignupComponent({ route: this.route }),
      [URL.MY_INFO]: new MyInfoComponent({ appState: this.state }),
    };
  }

  initEvent() {
    //TODO: popstate 매직넘버 3 정리하기
    window.addEventListener('popstate', e => {
      this.route('/' + e.state.path.split('/')[3], false);
    });

    $('header').addEventListener('click', this._onAnchorClicked);
    $(`#${ID_SELECTOR.NAV_LOGOUT}`).addEventListener('click', this.#onLogout);
  }

  #onLogout = () => {
    this.state.setData({
      [STATE_KEY.ACCESS_TOKEN]: KEYWORD.LOGOUT,
    });
  };

  handleNavButtonToChange = accessToken => {
    const isLogout = accessToken === KEYWORD.LOGOUT;

    if (isLogout) {
      this.#renderGuestNavBar();
      return;
    }

    this.#renderUserNavBar();
  };

  handlePageToRedirect = accessToken => {
    const isLogout = accessToken === KEYWORD.LOGOUT;

    if (isLogout) {
      this.route(URL.LOGIN);
      return;
    }

    this.route(URL.HOME);
  };

  #onLogout = () => {
    this.state.setData({
      loginResponse: {
        accessToken: KEYWORD.LOGOUT,
      },
    });
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
