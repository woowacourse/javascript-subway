import $ from '../utils/querySelector.js';
import HomeComponent from './HomeComponent.js';
import LoginComponent from './LoginComponent.js';
import SignupComponent from './SignupComponent.js';
import MyInfoComponent from './MyInfoComponent.js';
import Page from './Page.js';
import State from './State.js';
import { ID_SELECTOR } from '../constants.js';
import { show, hide } from '../utils/DOM.js';

class AppPage extends Page {
  constructor(props) {
    super(props);

    // TODO: setState 만들기, state를 protected로 만들기
    this.state = new State({
      loginResponse: {
        accessToken: '',
      },
    });

    // TODO: url을 정의하지 않았을 경우 오류 발생 처리
    this.url = {
      '/': new HomeComponent(),
      '/pages/login.html': new LoginComponent({
        route: this.route,
        appState: this.state,
      }),
      '/pages/signup.html': new SignupComponent({ route: this.route }),
      '/pages/myInfo.html': new MyInfoComponent(),
    };

    // TODO: KEY값 상수화
    this.state.setListener('loginResponse', this.handleNavButtonToChange);
  }

  initEvent() {
    window.addEventListener('popstate', e => {
      this.route(e.state.path, false);
    });

    $('header').addEventListener('click', this._onAnchorClicked);
    $(`#${ID_SELECTOR.NAV_LOGOUT}`).addEventListener(
      'click',
      this.#onUserLogout
    );
  }

  //TODO 핸들러 함수들 어순 고민해보기
  #onUserLogout = () => {
    //TODO: logout 상수화 생각해보기
    this.state.setData({
      loginResponse: {
        accessToken: 'logout',
      },
    });
  };

  handleNavButtonToChange = loginResponse => {
    const isLogout = loginResponse.accessToken === 'logout';

    if (isLogout) {
      this.#renderGuestNavBar();
      return;
    }

    this.#renderUserNavBar();
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
