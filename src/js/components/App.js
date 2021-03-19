import Stations from '../components/Stations.js';
import Lines from './Lines.js';
import Sections from './Sections.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Router from '../router/Router.js';

class App {
  constructor() {
    this.selectDom();
    this.bindEvent();
    this.router = new Router(this.$mainScreen);
  }

  init() {
    this.stations = new Stations();
    this.lines = new Lines();
    this.sections = new Sections();
    this.signIn = new SignIn();
    this.signUp = new SignUp();
  }

  selectDom() {
    this.$app = document.querySelector('#app');
    this.$mainScreen = document.querySelector('.main-screen');
  }

  bindEvent() {
    window.addEventListener('popstate', (e) => this.render(e.state.path));

    this.$app.addEventListener('click', (e) => {
      if (!e.target.matches('a')) return;
      e.preventDefault();

      this.handleSelectMenu(e);
    });
  }

  async handleSelectMenu(e) {
    const path = e.target.getAttribute('href');
    await this.router.route(path);

    if (path === '/signin') {
      this.signIn.init();
    }

    if (path === '/signup') {
      this.signUp.init();
    }
  }
}

export default App;
