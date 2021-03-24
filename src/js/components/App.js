import Navigation from "./Navigation.js";
import PageRouter from "../models/PageRouter.js";

import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";
import Stations from "./Stations.js";
import Lines from "./Lines.js";
import Sections from "./Sections.js";

import staticElements from "../constants/staticElements.js";
import { PAGE_URLS, PAGE_KEYS } from "../constants/pages.js";

export default class App {
  constructor() {
    this.isLoggedIn = false;
    this.pageRouter = new PageRouter();

    this.navigation = new Navigation({
      $parent: staticElements.$nav,
      setIsLoggedIn: this.setIsLoggedIn.bind(this),
      pageRouter: this.pageRouter,
    });

    this.pages = {
      [PAGE_KEYS.LOGIN]: new LoginForm({
        $parent: staticElements.$main,
        setIsLoggedIn: this.setIsLoggedIn.bind(this),
        pageRouter: this.pageRouter,
      }),
      [PAGE_KEYS.SIGNUP]: new SignupForm({
        $parent: staticElements.$main,
        pageRouter: this.pageRouter,
      }),
      [PAGE_KEYS.STATIONS]: new Stations({ $parent: staticElements.$main }),
      [PAGE_KEYS.LINES]: new Lines({ $parent: staticElements.$main }),
      [PAGE_KEYS.SECTIONS]: new Sections({ $parent: staticElements.$main }),
    };
  }

  registerRoutes() {
    Object.keys(this.pages).forEach((key) => {
      this.pageRouter.registerRoute({
        path: PAGE_URLS[key],
        handler: this.pages[key].render.bind(this.pages[key]),
      });
    });
  }

  setIsLoggedIn(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;

    this.render();
  }

  render() {
    if (this.isLoggedIn) {
      this.navigation.show();
      this.pageRouter.movePage(PAGE_URLS[PAGE_KEYS.STATIONS]);
    } else {
      this.navigation.hide();
      this.pageRouter.movePage(PAGE_URLS[PAGE_KEYS.LOGIN]);
    }
  }

  init() {
    this.registerRoutes();
    this.render();
  }
}
