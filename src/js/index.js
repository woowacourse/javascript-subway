import _ from '/src/css/index.css';
import { render } from '../js/router.js';
import NavigationBar from '../js/components/NavigationBar.js';
import Store from '../js/store.js';
import { getCookie } from './utils/cookie.js';
import { userInfoRequest } from '../js/request.js';
import EntryPage from './components/EntryPage.js';
import StationManager from './components/StationManager.js';
import LineManager from './components/LineManager.js';
import SectionManager from './components/SectionManager.js';
import LoginForm from './components/LoginForm.js';
import SignupForm from './components/SignupForm.js';
export default class App {
  constructor() {
    this.store = new Store();

    this.navigationBar = new NavigationBar(this.store);
    this.entryPage = new EntryPage();
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
  }

  async execute() {
    const path = location.pathname;

    this.navigationBar.init();
    this.initComponentByPath();

    await this.checkIsLoggedIn();
    await render(path, this.store.userSession.isLoggedIn);
  }

  // TODO: 함수명 바꾸기 - override history.pushState
  initComponentByPath() {
    const ps = history.pushState;

    history.pushState = function () {
      ps.apply(history, arguments);

      const component = this.components[location.pathname];
      component.init();
    }.bind(this);
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
