import _ from '/src/css/index.css';
import routeTo from './router.js';
import Store from './store.js';
import { userInfoRequest } from './request.js';
import { getCookie } from './utils/cookie.js';
import getAvailablePath from './utils/path.js';
import {
  NavigationBar,
  EntryPage,
  StationManager,
  LineManager,
  SectionManager,
  LoginForm,
  SignupForm,
} from './components';

export default class App {
  constructor() {
    this.store = new Store();

    this.navigationBar = new NavigationBar(this.store);
    this.entryPage = new EntryPage(this.store);
    this.stationManager = new StationManager(this.store);
    this.lineManager = new LineManager(this.store);
    this.sectionManager = new SectionManager(this.store);

    this.loginForm = new LoginForm(this.store);
    this.signupForm = new SignupForm(this.store);

    this.components = {
      '/': this.entryPage,
      '/lines': this.lineManager,
      '/stations': this.stationManager,
      '/sections': this.sectionManager,
      '/login': this.loginForm,
      '/signup': this.signupForm,
    };

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('pushState', (e) => {
      this.components[e.detail].init();
    });
  }

  async execute() {
    this.navigationBar.init();
    await this.checkIsLoggedIn();

    const path = getAvailablePath(location.pathname, this.store.isLoggedIn);

    routeTo(path);
  }

  async checkIsLoggedIn() {
    const accessToken = getCookie('token');

    if (!accessToken) {
      this.store.updateLoggedIn(false);
      return;
    }

    try {
      const response = await userInfoRequest(accessToken);
      const { name } = response;

      this.store.updateLoggedIn(true);
      this.store.updateUserName(name);
    } catch (error) {
      console.error(error);
      this.store.updateLoggedIn(false);
    }
  }
}

window.addEventListener('load', () => {
  const app = new App();
  app.execute();
});
