import Component from '../core/Component.js';
import Navigation from './navigation/Navigation.js';
import Sections from './sections/Sections.js';
import Stations from './stations/Stations.js';
import Lines from './lines/Lines.js';
import Login from './login/Login.js';
import Signup from './signup/Signup.js';
import Main from './main/Main.js';
import { LOCAL_STORAGE_KEY } from '../constants/index.js';
import { getLocalStorageItem, API } from '../utils/index.js';

export default class App extends Component {
  constructor() {
    super();
    this.init();
  }

  async init() {
    this.bindEvent();
    this.token = await this.getToken();
    this.Navigation.render(this.token);
  }

  mountComponent() {
    this.Navigation = new Navigation({
      changeTemplate: this.changeTemplate.bind(this),
    });
    this.Stations = new Stations();
    this.Lines = new Lines();
    this.Sections = new Sections();
    this.Login = new Login({ changeTemplate: this.changeTemplate.bind(this) });
    this.Signup = new Signup({
      changeTemplate: this.changeTemplate.bind(this),
    });
    this.Main = new Main();
  }

  bindEvent() {
    window.addEventListener('popstate', this.changeTemplate.bind(this));
  }

  async getToken() {
    const token = getLocalStorageItem({ key: LOCAL_STORAGE_KEY.TOKEN });
    const response = await API.getUserInfo(token);

    if (!response.id) {
      return '';
    }

    return token;
  }

  async changeTemplate(pathName) {
    const router = {
      '/': (token = '') => this.Main.load(token),
      '/stations': (token = '') => this.Stations.load(token),
      '/lines': (token = '') => this.Lines.load(token),
      '/sections': (token = '') => this.Sections.load(token),
      '/login': (token = '') => this.Login.load(token),
      '/signup': (token = '') => this.Signup.load(token),
    };

    const token = await this.getToken();

    this.Navigation.render(token);
    router[pathName]?.(token);
  }
}
