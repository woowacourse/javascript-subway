import { MESSAGE } from './constants/messages.js';
import LoginController from './pages/login/LoginController.js';
import SignupController from './pages/signup/SignupController.js';
import MainController from './pages/main/MainController.js';
import StationsController from './pages/stations/StationsController.js';
import LinesController from './pages/lines/LinesController.js';
import SectionsController from './pages/sections/SectionsController.js';
import LookupLinesController from './pages/lookupLines/LookupLinesController.js';
import { PATH } from './constants/path.js';
import jwtToken from './jwtToken.js';
import { COOKIE_KEY } from './constants/constants.js';

const router = {
  signupPage: new SignupController(),
  loginPage: new LoginController(),
  mainPage: new MainController(),
  stationsPage: new StationsController(),
  linesPage: new LinesController(),
  sectionsPage: new SectionsController(),
  lookupLinesPage: new LookupLinesController(),

  routes: {},

  init() {
    this.back();
    this.navigate(PATH.ROOT);
    this.routes = {
      [PATH.ROOT]: null,
      [PATH.SIGNUP]: this.signupPage,
      [PATH.STATIONS]: this.stationsPage,
      [PATH.LINES]: this.linesPage,
      [PATH.SECTIONS]: this.sectionsPage,
      [PATH.LOOKUPLINES]: this.lookupLinesPage,
    };
  },

  checkMainRoute() {
    this.routes[PATH.ROOT] = jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)
      ? this.mainPage
      : this.loginPage;
  },

  navigate(path) {
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
  },

  back() {
    window.addEventListener('popstate', e => {
      if (!e.state) return;

      this.navigate(e.state.path);
    });
  },
};

export default router;
