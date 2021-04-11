import $ from '../utils/querySelector.js';
import HomeComponent from '../components/HomeComponent.js';
import StationComponent from '../components/StationComponent.js';
import LineComponent from '../components/LineComponent.js';
import LoginComponent from '../components/LoginComponent.js';
import SignupComponent from '../components/SignupComponent.js';
import MyInfoComponent from '../components/MyInfoComponent.js';
import Page from './Page.js';
import State from '../State.js';
import {
  CLASS_SELECTOR,
  ID_SELECTOR,
  KEYWORD,
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_VALUE,
  HTTP_RESPONSE_STATUS,
  ALERT_MESSAGE,
  URL,
} from '../constants.js';
import { show, hide, closeModal } from '../utils/DOM.js';
import { loadStationList, loadLineList } from '../utils/loadByAJAX.js';
import SectionComponent from '../components/SectionComponent.js';
import FullMapComponent from '../components/FullMapComponent.js';

class AppPage extends Page {
  constructor(props) {
    super(props);
  }

  initState() {
    this.stationsState = new State([]);
    this.linesState = new State([]);
  }

  initStateListener() {
    this.stationsState.initListener();
    this.linesState.initListener();
  }

  initRouter() {
    this._router = {
      [URL.HOME]: new HomeComponent(),
      [URL.STATION]: new StationComponent({
        stationsState: this.stationsState,
        treatFetchError: this.treatFetchError,
      }),
      [URL.LINE]: new LineComponent({
        stationsState: this.stationsState,
        linesState: this.linesState,
        treatFetchError: this.treatFetchError,
      }),
      [URL.LOGIN]: new LoginComponent({
        route: this.route,
        treatFetchError: this.treatFetchError,
        login: this.login,
      }),
      [URL.SIGNUP]: new SignupComponent({
        route: this.route,
        treatFetchError: this.treatFetchError,
      }),
      [URL.MY_INFO]: new MyInfoComponent({
        treatFetchError: this.treatFetchError,
      }),
      [URL.SECTION]: new SectionComponent({
        linesState: this.linesState,
        stationsState: this.stationsState,
        treatFetchError: this.treatFetchError,
      }),
      [URL.FULL_MAP]: new FullMapComponent({
        treatFetchError: this.treatFetchError,
      }),
    };

    this.#checkUserLogin();
  }

  initEvent() {
    window.addEventListener('popstate', e => {
      const path = e.state.path.replace(/.+\/\/[^\/]+/g, '');

      this.route(path, false);
    });

    $('header').addEventListener('click', this._onAnchorClicked);

    $(`#${ID_SELECTOR.NAV_LOGOUT}`).addEventListener('click', () => {
      this.logout();
      alert(ALERT_MESSAGE.LOGOUT_SUCCESS);
    });

    $(`#${ID_SELECTOR.MODAL}`).addEventListener('click', ({ target }) => {
      if (!target.closest(`.${CLASS_SELECTOR.MODAL_CLOSE}`)) return;

      closeModal();
    });
  }

  treatFetchError = error => {
    if (error.message === String(HTTP_RESPONSE_STATUS.INVALID_ACCESS_TOKEN)) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY.ACCESS_TOKEN,
        LOCAL_STORAGE_VALUE.EMPTY
      );
      alert(ALERT_MESSAGE.EXPIRED_ACCESS_TOKEN);
      closeModal();
      this.logout();

      return;
    }

    alert(error.message);
  };

  login = async () => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    try {
      await loadStationList(this.stationsState, accessToken);
      await loadLineList(this.linesState, accessToken);

      this.#renderUserNavBar();
      this.route(URL.HOME);
    } catch (error) {
      this.treatFetchError(error);
    }
  };

  logout = () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.ACCESS_TOKEN,
      LOCAL_STORAGE_VALUE.EMPTY
    );
    this.initStateListener();
    this.#renderGuestNavBar();
    this.route(URL.LOGIN);
  };

  #checkUserLogin = async () => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    if (!accessToken) {
      this.logout();
      return;
    }

    this.login();
  };

  #renderUserNavBar() {
    show(`#${ID_SELECTOR.NAV_LINE}`);
    show(`#${ID_SELECTOR.NAV_STATION}`);
    show(`#${ID_SELECTOR.NAV_SECTION}`);
    show(`#${ID_SELECTOR.NAV_FULL_MAP}`);
    show(`#${ID_SELECTOR.NAV_MY_INFO}`);
    show(`#${ID_SELECTOR.NAV_LOGOUT}`);

    hide(`#${ID_SELECTOR.NAV_LOGIN}`);
  }

  #renderGuestNavBar() {
    hide(`#${ID_SELECTOR.NAV_LINE}`);
    hide(`#${ID_SELECTOR.NAV_STATION}`);
    hide(`#${ID_SELECTOR.NAV_SECTION}`);
    hide(`#${ID_SELECTOR.NAV_FULL_MAP}`);
    hide(`#${ID_SELECTOR.NAV_MY_INFO}`);
    hide(`#${ID_SELECTOR.NAV_LOGOUT}`);

    show(`#${ID_SELECTOR.NAV_LOGIN}`);
  }
}

export default AppPage;
