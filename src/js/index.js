import _ from '/src/css/index.css';
import routeTo from './router.js';
import Store from './store.js';
import {
  userInfoRequest,
  stationListRequest,
  lineListRequest,
} from './request.js';
import { getCookie } from './utils/cookie.js';
import getAvailablePath from './utils/path.js';
import popSnackbar from './utils/snackbar.js';
import { MESSAGES } from './constants/constants.js';
import {
  NavigationBar,
  EntryPage,
  StationManager,
  LineManager,
  SectionManager,
  LoginForm,
  SignupForm,
} from './components';
import { Station } from './models/Station.js';

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

    if (this.store.isLoggedIn) {
      await this.getPersonalSubwayData();
    }
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
      this.store.userName = name;
      this.store.userAuth.accessToken = accessToken;
    } catch (error) {
      console.error(error);
      this.store.updateLoggedIn(false);
    }
  }

  async getPersonalSubwayData() {
    const accessToken = this.store.userAuth.accessToken;

    try {
      const stationListResponse = await stationListRequest(accessToken);
      const stations = stationListResponse.map(
        (station) => new Station(station)
      );

      this.store.stations = stations;

      const lineListResponse = await lineListRequest(accessToken);
      const lines = lineListResponse.map((line) => new Line(line));

      this.store.lines = lines;
    } catch (error) {
      console.log(error);
    }
  }
}

window.addEventListener('load', () => {
  const app = new App();
  app.execute();
});
