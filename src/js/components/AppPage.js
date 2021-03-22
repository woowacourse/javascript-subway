import $ from '../utils/querySelector.js';
import HomeComponent from './HomeComponent.js';
import LoginComponent from './LoginComponent.js';
import SignupComponent from './SignupComponent.js';
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
    };

    // TODO: KEY값 상수화
    this.state.setListener('loginResponse', this.onNavButtonChanged);
  }

  onNavButtonChanged(loginResponse) {
    const isLogin = loginResponse.accessToken;

    if (isLogin) {
      //TODO: show hide로 추상화하면 가독성이 더 좋을듯
      show(`#${ID_SELECTOR.NAV_LINE}`);
      show(`#${ID_SELECTOR.NAV_STATION}`);
      show(`#${ID_SELECTOR.NAV_SECTION}`);
      show(`#${ID_SELECTOR.NAV_FULL_MAP}`);
      show(`#${ID_SELECTOR.NAV_SEARCH}`);
      show(`#${ID_SELECTOR.NAV_LOGOUT}`);
      hide(`#${ID_SELECTOR.NAV_LOGIN}`);
      return;
    }

    show(`#${ID_SELECTOR.NAV_LOGIN}`);
    hide(`#${ID_SELECTOR.NAV_LOGOUT}`);
  }

  initEvent() {
    history.replaceState({ path: '/' }, null, '/');

    window.addEventListener('popstate', e => {
      this.route(e.state.path);
    });

    $('header').addEventListener('click', this._onAnchorClicked);
  }
}

export default AppPage;
