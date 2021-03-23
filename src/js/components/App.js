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
    this.pageRouter = new PageRouter();

    this.navigation = new Navigation({
      $parent: staticElements.$nav,
      setIsLoggedIn: this.setIsLoggedIn.bind(this),
      pageRouter: this.pageRouter,
    });
    this.loginForm = new LoginForm({
      $parent: staticElements.$main,
      setIsLoggedIn: this.setIsLoggedIn.bind(this),
      pageRouter: this.pageRouter,
    });
    this.signupForm = new SignupForm({
      $parent: staticElements.$main,
      pageRouter: this.pageRouter,
    });
    this.stations = new Stations({ $parent: staticElements.$main });
    this.lines = new Lines({ $parent: staticElements.$main });
    this.sections = new Sections({ $parent: staticElements.$main });
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
      this.navigation.hide();
      this.pageRouter.movePage(PAGE_URLS.LOGIN);
    }
  }

  init() {
    this.registerRoutes();
    this.render();
  }
}
