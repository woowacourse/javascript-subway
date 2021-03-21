import Component from '../core/Component.js';
import Navigation from './navigation/Navigation.js';
import Sections from './sections/Sections.js';
import Stations from './stations/Stations.js';
import Lines from './lines/Lines.js';
import Login from './login/Login.js';
import Signup from './signup/Signup.js';
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
    this.Signup = new Signup();
  }

  bindEvent() {
    window.addEventListener('popstate', this.changeTemplate.bind(this));
  }

  changeTemplate(pathName) {
    if (pathName === '/stations') {
      this.Stations.load();
      return;
    }

    if (pathName === '/sections') {
      this.Sections.load();
      return;
    }

    if (pathName === '/lines') {
      this.Lines.load();
      return;
    }

    if (pathName === '/login') {
      this.Login.load();
      return;
    }

    if (pathName === '/signup') {
      this.Signup.load();
      return;
    }
  }
}
