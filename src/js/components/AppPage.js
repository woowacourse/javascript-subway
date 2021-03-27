import $ from '../utils/querySelector.js';
import HomeComponent from './HomeComponent.js';
import StationComponent from './StationComponent.js';
import LineComponent from './LineComponent.js';
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
    //TODO: STATE를 여러 종류로 나누기 ex) loginState, stationState
    //TODO: STATE를 객체를 감싸는 형태로 하지 말고 그냥 넣기
    this.loginState = new State({
      [STATE_KEY.ACCESS_TOKEN]: KEYWORD.LOGOUT,
    });

    this.stationState = new State({
      [STATE_KEY.STATION]: [],
    });

    this.loginState.setListener(
      STATE_KEY.ACCESS_TOKEN,
      this.handleNavButtonToChange
    );
    this.loginState.setListener(
      STATE_KEY.ACCESS_TOKEN,
      this.handlePageToRedirect
    );

    //TODO: 라우트를 initRoute 같은 걸로 나눌 수 있을까?
    this._router = {
      [URL.HOME]: new HomeComponent(),
      [URL.STATION]: new StationComponent({
        loginState: this.loginState,
        stationState: this.stationState,
      }),
      [URL.LINE]: new LineComponent(),
      [URL.LOGIN]: new LoginComponent({
        route: this.route,
        loginState: this.loginState,
      }),
      [URL.SIGNUP]: new SignupComponent({ route: this.route }),
      [URL.MY_INFO]: new MyInfoComponent({ loginState: this.loginState }),
    };
  }

  initLoad() {}

  initEvent() {
    //TODO: popstate 정리하기
    window.addEventListener('popstate', e => {
      this.route('/' + e.state.path.split('/')[3], false);
    });

    $('header').addEventListener('click', this._onAnchorClicked);
    $(`#${ID_SELECTOR.NAV_LOGOUT}`).addEventListener('click', this.#onLogout);
  }

  #onLogout = () => {
    this.loginState.setData({
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
