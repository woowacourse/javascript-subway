import $ from '../utils/querySelector.js';
import HomeComponent from './HomeComponent.js';
import LoginComponent from './LoginComponent.js';
import SignupComponent from './SignupComponent.js';
import Page from './Page.js';
import State from './State.js';
import { ID_SELECTOR } from '../constants.js';

class AppPage extends Page {
  constructor(props) {
    super({});

    // TODO: setState 만들기, state를 protected로 만들기
    this.state = new State({
      loginResponse: {
        accessToken: '',
      },
    });

    // TODO: url을 정의하지 않았을 경우 오류 발생 처리
    this.url = {
        '/': new HomeComponent({}),
      '/pages/login.html': new LoginComponent({
        route: this.route,
        appState: this.state,
      }),
        '/pages/signup.html': new SignupComponent({ route: this.route }),
    };
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
