import _ from '/src/css/index.css';
import routeTo from './router.js';
import Store from './store.js';
import { userInfoRequest, stationListRequest, lineListRequest } from './request.js';
import { getCookie } from './utils/cookie.js';
import getAvailablePath from './utils/path.js';
import popSnackbar from './utils/snackbar.js';
import { SELECTOR, MESSAGES } from './constants/constants.js';
import {
  NavigationBar,
  EntryPage,
  StationManager,
  LineManager,
  SectionManager,
  LoginForm,
  SignupForm,
} from './components';
import Station from './models/Station.js';
import Line from './models/Line.js';
import { $, show, hide } from './utils/dom.js';
import MapPage from './components/MapPage/index.js';

export default class App {
  constructor() {
    this.store = new Store();

    this.navigationBar = new NavigationBar(this.store);
    this.entryPage = new EntryPage(this.store);
    this.stationManager = new StationManager(this.store);
    this.lineManager = new LineManager(this.store);
    this.sectionManager = new SectionManager(this.store);
    this.mapPage = new MapPage(this.store);

    this.loginForm = new LoginForm(this.store);
    this.signupForm = new SignupForm(this.store);

    this.components = {
      '/': this.entryPage,
      '/lines': this.lineManager,
      '/stations': this.stationManager,
      '/sections': this.sectionManager,
      '/login': this.loginForm,
      '/signup': this.signupForm,
      '/map': this.mapPage,
    };

    this.bindEvents();
    this.store.subscribe(this);
  }

  bindEvents() {
    window.addEventListener('pushState', (e) => {
      this.components[e.detail].init();
    });
  }

  async execute() {
    this.navigationBar.init();

    await this.checkIsLoggedIn();
    await this.update();

    const path = getAvailablePath(location.pathname, this.store.isLoggedIn);

    routeTo(path);
  }

  async update() {
    if (this.store.isLoggedIn) {
      await this.getPersonalSubwayData();
      show($(SELECTOR.USER_GREET_MESSAGE));
      $(SELECTOR.USER_GREET_NAME).textContent = this.store.userAuth.name;
      return;
    }
    hide($(SELECTOR.USER_GREET_MESSAGE));
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

      this.store.userName = name;
      this.store.userAuth.accessToken = accessToken;
      this.store.updateLoggedIn(true);
    } catch (error) {
      console.error(error);
      this.store.updateLoggedIn(false);
    }
  }

  async getPersonalSubwayData() {
    const accessToken = this.store.userAuth.accessToken;
    try {
      const stationListResponse = await stationListRequest(accessToken);
      const stations = stationListResponse.map((station) => new Station(station));
      const lineListResponse = await lineListRequest(accessToken);
      const lines = lineListResponse.map((line) => new Line(line));

      this.store.stations = stations;
      this.store.lines = lines;
    } catch (error) {
      console.error(error);
      popSnackbar(MESSAGES.ERROR_FETCH_STATION_DATA);
    }
  }
}

window.addEventListener('load', async () => {
  const app = new App();
  await app.execute();
});
