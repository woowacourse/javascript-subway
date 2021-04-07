import Router from './router';

import Home from './components/home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup/Signup';
import Header from './components/header/Header';
import Station from './components/station/Station';
import Line from './components/line/Line';
import Section from './components/section/Section';

import { PATH, STORAGE } from './constants';
import { authAPI } from './api/auth';

class App {
  #isLoggedIn;

  constructor() {
    this.#isLoggedIn = false;
  }

  init(path) {
    this._initRouter();
    this._mountComponent();
    this._registerRouterComponent();
    this.switchURL(path);
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
    this.#isLoggedIn = await authAPI.isValidUserAccessToken(
      STORAGE.USER_ACCESS_TOKEN,
    );

    this.header.init(this.#isLoggedIn);
    const component = this.components[href];
    const state = { isLoggedIn: this.#isLoggedIn };

    if (component) {
      await component.init?.(state);
      this.router.renderPage(href, component.getPageInfo?.());
      component.initDOM?.();
    }
  }
}

export default App;
