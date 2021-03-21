import { COOKIE_KEY, MESSAGE } from './constants.js';
import jwtToken from './jwtToken.js';
import LoginPage from './pages/Login.js';
import SignupPage from './pages/Signup.js';
import MainPage from './pages/Main.js';
import StationsPage from './pages/Stations.js';
import LinesPage from './pages/Lines.js';
import SectionsPage from './pages/Sections.js';

// TODO: async, await 적용할 부분이 있는지 찾아보기
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
      '/': null,
      '/signup': this.signupPage,
      '/stations': this.stationsPage,
      '/lines': this.linesPage,
      '/sections': this.sectionsPage,
    };
  }

  checkMainRoute() {
    this.routes['/'] = this.userToken ? this.mainPage : this.loginPage;
  }

  init() {
    this.back();
    this.navigate('/');
  }

  navigate(path) {
    this.userToken = jwtToken.getToken(COOKIE_KEY.JWT_TOKEN);
    if (path === '/') {
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
