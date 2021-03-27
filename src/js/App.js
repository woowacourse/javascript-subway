import Router from './router.js';

import Home from './components/home/Home.js';
import Login from './components/login/Login.js';
import SignUp from './components/signup/Signup.js';
import Header from './components/header/Header.js';
import Station from './components/station/Station.js';
import Line from './components/line/Line.js';
import Section from './components/section/Section.js';

import { getLocalStorageItem } from './utils/storage.js';
import { request } from './utils/api.js';
import { ACTIONS, BASE_URL, PATH, STORAGE } from './constants.js';

class App {
  #isLoggedIn;

  constructor() {
    this.#isLoggedIn = false;
  }

  init() {
    this._initRouter();
    this._mountComponent();
    this._registerRouterComponent();
    this.switchURL(PATH.HOME);
  }

  async _isValidUserAccessToken() {
    const userAccessToken = getLocalStorageItem(STORAGE.USER_ACCESS_TOKEN);
    if (!userAccessToken) return false;

    try {
      const option = {
        Authorization: `Bearer ${userAccessToken}`,
        Accept: 'application/json',
      };
      await request(`${BASE_URL}${ACTIONS.USER}`, option);

      return true;
    } catch {
      return false;
    }
  }

  _initRouter() {
    this.router = new Router();
  }

  _mountComponent() {
    this.header = new Header({
      switchURL: this.switchURL.bind(this),
    });
    this.home = new Home();
    this.login = new Login({
      switchURL: this.switchURL.bind(this),
    });
    this.signup = new SignUp({
      switchURL: this.switchURL.bind(this),
    });
    this.stations = new Station();
    this.sections = new Section();
    this.lines = new Line();
  }

  _registerRouterComponent() {
    this.components = {
      [PATH.HOME]: this.home,
      [PATH.LOGIN]: this.login,
      [PATH.SIGNUP]: this.signup,
      [PATH.STATIONS]: this.stations,
      [PATH.SECTIONS]: this.sections,
      [PATH.LINES]: this.lines,
    };
  }

  async switchURL(href) {
    this.#isLoggedIn = await this._isValidUserAccessToken();
    this.header.init(this.#isLoggedIn);

    const component = this.components[href];
    const state = { isLoggedIn: this.#isLoggedIn };

    await component.init(state);
    this.router.renderPage(href, component.getPageInfo());
    component.initDOM();
  }
}

export default App;
