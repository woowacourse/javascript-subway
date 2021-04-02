import Router from './router.js';

import Home from './components/home/Home.js';
import Login from './components/login/Login.js';
import SignUp from './components/signup/Signup.js';
import Header from './components/header/Header.js';
import Station from './components/station/Station.js';
import Line from './components/line/Line.js';
import Section from './components/section/Section.js';
import Preview from './components/preview/Preview.js';

import { PATH, STORAGE } from './constants.js';
import { authAPI } from '../../api/auth.js';

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
    this.preview = new Preview();
  }

  _registerRouterComponent() {
    this.components = {
      [PATH.HOME]: this.home,
      [PATH.LOGIN]: this.login,
      [PATH.SIGNUP]: this.signup,
      [PATH.STATIONS]: this.stations,
      [PATH.SECTIONS]: this.sections,
      [PATH.LINES]: this.lines,
      [PATH.MAP]: this.preview,
    };
  }

  async switchURL(href) {
    if (href !== '/' && href === window.location.pathname) return;

    this.#isLoggedIn = await authAPI.isValidUserAccessToken(
      STORAGE.USER_ACCESS_TOKEN,
    );

    this.header.init(this.#isLoggedIn);
    const component = this.components[href];
    const state = { isLoggedIn: this.#isLoggedIn };

    try {
      component.init && (await component.init(state));
      this.router.renderPage(href, component.getPageInfo());
      component.initDOM && component.initDOM();
    } catch {
      this.switchURL(PATH.HOME);
    }
  }
}

export default App;
