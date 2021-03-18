import Navigation from "./Navigation.js";
import PageRouter from "../models/PageRouter.js";

import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";
import Stations from "./Stations.js";
import Lines from "./Lines.js";
import Sections from "./Sections.js";

import staticElements from "../constants/staticElements.js";
import PAGE_URLS from "../constants/pages.js";

export default class App {
  constructor() {
    this.isLoggedIn = false;
    this.$nav = staticElements.$nav;
    this.$main = staticElements.$main;

    this.pageRouter = new PageRouter();
    this.navigation = new Navigation({
      $parent: this.$nav,
      pageRouter: this.pageRouter,
    });
    this.loginForm = new LoginForm({
      $parent: this.$main,
      setIsLoggedIn: this.setIsLoggedIn.bind(this),
      pageRouter: this.pageRouter,
    });
    this.signupForm = new SignupForm({
      $parent: this.$main,
      pageRouter: this.pageRouter,
    });
    this.stations = new Stations({ $parent: this.$main });
    this.lines = new Lines({ $parent: this.$main });
    this.sections = new Sections({ $parent: this.$main });
  }

  registerRoutes() {
    this.pageRouter.registerRoute({
      path: PAGE_URLS.HOME,
      handler: this.render.bind(this),
    });
    this.pageRouter.registerRoute({
      path: PAGE_URLS.LOGIN,
      handler: this.loginForm.render.bind(this.loginForm),
    });
    this.pageRouter.registerRoute({
      path: PAGE_URLS.SIGNUP,
      handler: this.signupForm.render.bind(this.signupForm),
    });
    this.pageRouter.registerRoute({
      path: PAGE_URLS.STATIONS,
      handler: this.stations.render.bind(this.stations),
    });
    this.pageRouter.registerRoute({
      path: PAGE_URLS.LINES,
      handler: this.lines.render.bind(this.lines),
    });
    this.pageRouter.registerRoute({
      path: PAGE_URLS.SECTIONS,
      handler: this.sections.render.bind(this.sections),
    });
  }

  setIsLoggedIn(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;

    this.render();
  }

  render() {
    if (this.isLoggedIn) {
      this.navigation.show();
      this.pageRouter.movePage(PAGE_URLS.STATIONS);
    } else {
      this.pageRouter.movePage(PAGE_URLS.LOGIN);
    }
  }

  init() {
    this.registerRoutes();
    this.render();
  }
}
