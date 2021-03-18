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

  initDOM() {
    this.header = new Header({ switchURL: this.switchURL.bind(this) });
    this.header.init();
  }

  mountComponent() {
    this.login = new Login({ switchURL: this.switchURL.bind(this) });
    this.signup = new SignUp();
  }

  switchURL(href) {
    this.router.renderPage(href);

    if (href === '/login') {
      this.login.init();
    } else if (href === '/signUp') {
      this.signup.init();
    }
  }
}

export default App;
