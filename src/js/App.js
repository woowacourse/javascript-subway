import Router from './router.js';

import Home from './components/home/Home.js';
import Login from './components/login/Login.js';
import SignUp from './components/signup/Signup.js';
import Header from './components/header/Header.js';

import { snackbar } from './utils/snackbar.js';
import { getLocalStorageItem } from './utils/storage.js';
import { request } from './utils/api.js';
import { ACTIONS, BASE_URL, REQUEST_HEADER_HOST } from './constants.js';

class App {
  constructor() {
    this.isLoggedIn = false;
    this.showSnackbar = snackbar();
  }

  init() {
    this.initRouter();
    this.mountComponent();
    this.registerRouterComponent();
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
  }

  mountComponent() {
    this.header = new Header({
      switchURL: this.switchURL.bind(this),
      showSnackbar: this.showSnackbar.bind(this),
    });
    this.home = new Home();
    this.login = new Login({
      switchURL: this.switchURL.bind(this),
      showSnackbar: this.showSnackbar.bind(this),
    });
    this.signup = new SignUp({
      switchURL: this.switchURL.bind(this),
      showSnackbar: this.showSnackbar.bind(this),
    });
  }

  registerRouterComponent() {
    this.components = {
      '/': this.home,
      '/login': this.login,
      '/signup': this.signup,
    };
  }

  async switchURL(href) {
    this.isLoggedIn = await this.isValidUserAccessToken();
    this.header.init(this.isLoggedIn);

    const component = this.components[href];
    const state = { isLoggedIn: this.isLoggedIn };

    component.init(state);
    this.router.renderPage(href, component.getInfo());
    component.initDOM();
  }
}

export default App;
