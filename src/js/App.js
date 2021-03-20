import Router from './router.js';

import Home from './components/home/Home.js';
import Login from './components/login/Login.js';
import SignUp from './components/signup/Signup.js';
import Header from './components/header/Header.js';

import { render } from './renderer.js';
import { getLocalStorageItem } from './utils/storage.js';
import { request } from './utils/api.js';
import { ACTIONS, BASE_URL, REQUEST_HEADER_HOST } from './constants.js';

class App {
  constructor() {
    this.isLoggedIn = false;
  }

  init() {
    this.initRouter();
    this.mountComponent();
    this.switchURL('/');
  }

  async isValidUserAccessToken() {
    const userAccessToken = getLocalStorageItem('userAccessToken');
    if (!userAccessToken) return false;

    try {
      await request(BASE_URL + ACTIONS.USER, {
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
    this.route = {
      '/': () => this.home.init(this.isLoggedIn),
      '/login': () => this.login.init(),
      '/signup': () => this.signup.init(),
    };
  }

  mountComponent() {
    this.header = new Header({
      switchURL: this.switchURL.bind(this),
    });
    this.home = new Home();
    this.login = new Login({ switchURL: this.switchURL.bind(this) });
    this.signup = new SignUp({ switchURL: this.switchURL.bind(this) });
  }

  async switchURL(href) {
    this.router.renderPage(href);
    this.isLoggedIn = await this.isValidUserAccessToken();
    this.header.init(this.isLoggedIn);
    this.route[href]();
  }
}

export default App;
