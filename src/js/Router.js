import { MESSAGE } from './constants/messages.js';
import { COOKIE_KEY } from './constants/constants.js';
import jwtToken from './jwtToken.js';
import LoginPage from './pages/login/LoginPage.js';
import SignupPage from './pages/signup/SignupPage.js';
import MainPage from './pages/main/MainPage.js';
import StationsPage from './pages/stations/StationsPage.js';
import LinesPage from './pages/lines/LinesPage.js';
import SectionsPage from './pages/sections/SectionsPage.js';
import { PATH } from './constants/path.js';

class Router {
  constructor() {
    this.userToken = '';

    this.signupPage = new SignupPage(this);
    this.loginPage = new LoginPage(this);
    this.mainPage = new MainPage(this);
    this.stationsPage = new StationsPage(this);
    this.linesPage = new LinesPage(this);
    this.sectionsPage = new SectionsPage(this);

    this.routes = {
      [PATH.ROOT]: null,
      [PATH.SIGNUP]: this.signupPage,
      [PATH.STATIONS]: this.stationsPage,
      [PATH.LINES]: this.linesPage,
      [PATH.SECTIONS]: this.sectionsPage,
    };
  }

  init() {
    this.back();
    this.navigate(PATH.ROOT);
  }

  checkMainRoute() {
    this.routes[PATH.ROOT] = this.userToken ? this.mainPage : this.loginPage;
  }

  navigate(path) {
    this.userToken = jwtToken.getToken(COOKIE_KEY.JWT_TOKEN);
    if (path === PATH.ROOT) {
      this.checkMainRoute();
    }

    try {
      const targetPage = this.routes[path];

      if (!targetPage) {
        throw new Error(MESSAGE.ERROR.PAGE_NOT_FOUND);
      }

      targetPage.init();
      window.history.pushState({ path }, null, path);
    } catch (error) {
      console.error(error);
    }
  }

  back() {
    window.addEventListener('popstate', e => {
      if (!e.state) return;

      this.navigate(e.state.path);
    });
  }
}

export default Router;
