import $ from '../utils/querySelector.js';
import HomeComponent from './HomeComponent.js';
import LoginComponent from './LoginComponent.js';
import SignupComponent from './SignupComponent.js';
import Page from './Page.js';

class AppPage extends Page {
  constructor(props) {
    super({});
    // TODO: setState 만들기, state를 protected로 만들기
    this.state = {
      url: {
        '/': new HomeComponent({}),
        '/pages/login.html': new LoginComponent({ route: this.route }),
        '/pages/signup.html': new SignupComponent({ route: this.route }),
      },
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
