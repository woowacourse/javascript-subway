import Router from './router.js';

import Home from './components/home/Home.js';
import Login from './components/login/Login.js';
import SignUp from './components/signup/Signup.js';
import Header from './layouts/Header.js';

import { render } from './renderer.js';
import { getLocalStorageItem } from './utils/storage.js';
import { request } from './utils/api.js';
import { ACTIONS, BASE_URL, REQUEST_HEADER_HOST } from './constants.js';

class App {
  constructor() {
    this.isLoggedIn = false;
  }

  async init() {
    this.isLoggedIn = await this.isValidUserAccessToken();
    this.initRouter();
    this.initDOM();
    this.mountComponent();
    this.switchURL('/');
  }

  async isValidUserAccessToken() {
    const userAccessToken = getLocalStorageItem('userAccessToken');

    if (!userAccessToken) return false;

    try {
      const user = await request(BASE_URL + ACTIONS.USER, {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
          Accept: 'application/json',
          Host: REQUEST_HEADER_HOST,
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  initRouter() {
    this.router = new Router();
    this.router.init();
  }

  initDOM() {
    this.header = new Header({
      switchURL: this.switchURL.bind(this),
    });
    // TODO : isLoggedIN init으로 옮기기
  }

  mountComponent() {
    this.home = new Home();
    this.login = new Login({ switchURL: this.switchURL.bind(this) });
    this.signup = new SignUp({ switchURL: this.switchURL.bind(this) });
  }

  async switchURL(href) {
    this.router.renderPage(href);

    if (href === '/') {
      this.isLoggedIn = await this.isValidUserAccessToken();
      this.header.init(this.isLoggedIn);
      this.home.init(this.isLoggedIn);
    } else if (href === '/login') {
      this.login.init();
    } else if (href === '/signup') {
      this.signup.init();
    }
  }
}

export default App;
