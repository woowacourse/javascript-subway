import Stations from '../components/Stations.js';
import Lines from './Lines.js';
import Sections from './Sections.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import { request } from '../utils/request.js';
import { routes } from '../utils/constants.js';

class App {
  constructor() {
    this.selectDom();
    this.bindEvent();
  }

  init() {
    this.stations = new Stations();
    this.lines = new Lines();
    this.sections = new Sections();
    this.signIn = new SignIn({ route: this.route.bind(this) });
    this.signUp = new SignUp();
  }

  selectDom() {
    this.$mainScreen = document.querySelector('.main-screen');
    this.$navBar = document.querySelector('.nav-bar');
    this.$headTitle = document.querySelector('head > title');
  }

  bindEvent() {
    window.addEventListener('popstate', (e) => this.render(e.state.path));

    this.$navBar.addEventListener('click', (e) => {
      if (!e.target.matches('a')) return;

      e.preventDefault();
      this.handleSelectMenu(e);
    });
  }

  async handleSelectMenu(e) {
    const path = e.target.getAttribute('href');
    await this.route(path);

    if (path === '/signin') {
      this.signIn.init();
    }
  }

  async route(path) {
    history.pushState({ path }, null, path);
    await this.render(path);
  }

  async render(path) {
    const [uri, headTitle] = routes[path];
    const template = await request({ uri, type: 'text' });

    this.$mainScreen.innerHTML = template;
    this.$headTitle.innerText = headTitle;
  }
}

export default App;
