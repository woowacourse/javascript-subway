import Router from './router.js';

import Login from './components/login/Login.js';
import SignUp from './components/signup/Signup.js';

import Header from './layouts/Header.js';
import { render } from './renderer.js';

class App {
  constructor() {}

  init() {
    this.router = new Router();
    this.router.init();
    this.initDOM();
    this.mountComponent();
  }

  // fetchUserTokenValid() {true, false}

  initDOM() {
    // TODO : userToken 가져와 검증하기
    // TODO : 아래에 userToken 유효성 결과 아래에 props로 전달
    this.header = new Header({ switchURL: this.switchURL.bind(this) });
    this.header.init();
  }

  mountComponent() {
    this.login = new Login({ switchURL: this.switchURL.bind(this) });
    this.signup = new SignUp({ switchURL: this.switchURL.bind(this) });
  }

  switchURL(href) {
    if (href === '/') {
      this.initDOM();
      return;
    }

    this.router.renderPage(href);

    if (href === '/login') {
      this.login.init();
    } else if (href === '/signup') {
      this.signup.init();
    }
  }
}

export default App;
