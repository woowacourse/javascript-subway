import { MESSAGE } from './constants/messages.js';
import LoginPage from './pages/login/LoginPage.js';
import SignupPage from './pages/signup/SignupPage.js';
import MainPage from './pages/main/MainPage.js';
import StationsController from './pages/stations/StationsController.js';
import LinesController from './pages/lines/LinesController.js';
import SectionsController from './pages/sections/SectionsController.js';
import { PATH } from './constants/path.js';
import user from './models/user.js';

const router = {
  userToken: '',

  signupPage: new SignupPage(),
  loginPage: new LoginPage(),
  mainPage: new MainPage(),
  stationsPage: new StationsController(),
  linesPage: new LinesController(),
  sectionsPage: new SectionsController(),

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
    };
  },

  checkMainRoute() {
    this.routes[PATH.ROOT] = this.userToken ? this.mainPage : this.loginPage;
  },

  navigate(path) {
    this.userToken = user.getAuthorization();
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
