import Component from '../core/Component.js';
import Navigation from './navigation/Navigation.js';
import Sections from './sections/Sections.js';
import Stations from './stations/Stations.js';
import Lines from './lines/Lines.js';
import Login from './login/Login.js';
import Signup from './signup/Signup.js';
import Main from './main/Main.js';
export default class App extends Component {
  constructor() {
    super();
    this.bindEvent();
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

  changeTemplate(pathName) {
    const router = {
      '/': () => this.Main.load(),
      '/stations': () => this.Stations.load(),
      '/lines': () => this.Lines.load(),
      '/sections': () => this.Sections.load(),
      '/login': () => this.Login.load(),
      '/signup': () => this.Signup.load(),
    };

    router[pathName]?.();
  }
}
