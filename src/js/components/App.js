import Component from '../core/Component.js';
import Navigation from './navigation/Navigation.js';
import Sections from './sections/Sections.js';
import Stations from './stations/Stations.js';
import Lines from './lines/Lines.js';
import Login from './login/Login.js';
import Signup from './signup/Signup.js';
import Main from './main/Main.js';
import SubwayMap from './SubwayMap/SubwayMap.js';
import { LOCAL_STORAGE_KEY, LOGIN_REQUIRED_TEMPLATE, MESSAGE } from '../constants/index.js';
import { $, getLocalStorageItem } from '../utils/index.js';
import { service } from '../service/index.js';

export default class App extends Component {
  constructor() {
    super();
    this.bindEvent();
    this.changeTemplate('/');

    this.router = {
      '/': () => this.Main.load(),
      '/stations': () => this.Stations.load(),
      '/lines': () => this.Lines.load(),
      '/sections': () => this.Sections.load(),
      '/map': () => this.SubwayMap.load(),
      '/login': () => this.Login.load(),
      '/signup': () => this.Signup.load(),
    };
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
    window.addEventListener('popstate', this.changeTemplate.bind(this));
  }

  render() {
    $('main').innerHTML = LOGIN_REQUIRED_TEMPLATE;
  }

  async changeTemplate(pathName) {
    const token = getLocalStorageItem({ key: LOCAL_STORAGE_KEY.TOKEN });
    const isLoggedIn = await service.isValidToken(token);

    if (!isLoggedIn) {
      console.error(MESSAGE.REQUIRE_LOGIN);
      localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
      this.Navigation.render();
      this.router[pathName]?.();

      return;
    }

    this.Navigation.render(token);

    token ? await this.router[pathName]?.() : this.render();
  }
}
