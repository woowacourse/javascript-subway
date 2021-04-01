import Component from '../core/Component.js';
import Navigation from './navigation/Navigation.js';
import Sections from './section/Sections.js';
import Stations from './station/Stations.js';
import Lines from './line/Lines.js';
import SubwayMap from './subwayMap/SubwayMap.js';
import Login from './login/Login.js';
import Signup from './signup/Signup.js';
import Main from './main/Main.js';
import { LOCAL_STORAGE_KEY, MESSAGE } from '../constants/index.js';
import { getLocalStorageItem } from '../utils/index.js';
import { serviceAPI } from '../service/index.js';

export default class App extends Component {
  constructor() {
    super();
    this.router = {
      '/': (token = '') => this.Main.load(token),
      '/stations': (token = '') => this.Stations.load(token),
      '/lines': (token = '') => this.Lines.load(token),
      '/sections': (token = '') => this.Sections.load(token),
      '/subway-map': (token = '') => this.SubwayMap.load(token),
      '/login': (token = '') => this.Login.load(token),
      '/signup': (token = '') => this.Signup.load(token),
    };
    this.bindEvent();
    this.changeTemplate('/');
  }

  mountComponent() {
    this.Navigation = new Navigation({
      changeTemplate: this.changeTemplate.bind(this),
    });
    this.Stations = new Stations();
    this.Lines = new Lines();
    this.Sections = new Sections();
    this.SubwayMap = new SubwayMap();
    this.Login = new Login({ changeTemplate: this.changeTemplate.bind(this) });
    this.Signup = new Signup({
      changeTemplate: this.changeTemplate.bind(this),
    });
    this.Main = new Main();
  }

  bindEvent() {
    window.addEventListener('popstate', this.changeTemplate.bind(this, window.location.pathname));
  }

  async changeTemplate(pathName = '') {
    if (!pathName) {
      pathName = window.location.pathname;
    }
    const token = getLocalStorageItem({ key: LOCAL_STORAGE_KEY.TOKEN });
    const isLoggedIn = await serviceAPI.isValidToken(token);

    if (!isLoggedIn) {
      console.error(MESSAGE.REQUIRE_LOGIN);
      localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
      this.Navigation.render();
      this.router[pathName]?.();

      return;
    }

    this.Navigation.render(token);
    await this.router[pathName]?.(token);
  }
}
