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
    this.signIn = new SignIn({ changeSignInToSignOutStatus: this.changeSignInToSignOutStatus.bind(this) });
    this.signUp = new SignUp();
  }

  selectDom() {
    this.$app = document.querySelector('#app');
    this.$mainScreen = document.querySelector('.main-screen');
    this.$signInButton = document.querySelector('.nav-bar__signin-button');
    this.$$mainMenuButtons = document.querySelectorAll('.nav-bar .main__menu-router');
  }

  bindEvent() {
    window.addEventListener('popstate', (e) => {
      this.router.render(e.state.path);
    });

    this.$app.addEventListener('click', (e) => {
      if (!this.isRouterButton(e.target)) return;
      e.preventDefault();

      this.handleSelectMenu(e);
    });
  }

  isRouterButton(target) {
    return target.matches('.main__menu-router');
  }

  async handleSelectMenu(e) {
    const path = e.target.closest('a').getAttribute('href');
    await this.router.route(path);

    if (path === '/signin') {
      this.signIn.init();
    }

    if (path === '/signup') {
      this.signUp.init();
    }

    if (path === '/signout') {
      this.changeSignOutToSignInStatus();
      this.router.route('/');
    }
  }

  changeSignInToSignOutStatus(accessToken) {
    sessionStorage.setItem('token', accessToken);
    this.$signInButton.innerText = '🙅🏻 로그아웃';
    this.$signInButton.closest('a').href = '/signout';
    this.showMenuButton();
  }

  changeSignOutToSignInStatus() {
    sessionStorage.removeItem('token');
    this.$signInButton.innerText = '🙆🏻 로그인';
    this.$signInButton.closest('a').href = '/signin';
    this.hideMenuButton();
  }

  showMenuButton() {
    this.$$mainMenuButtons.forEach((button) => {
      button.classList.remove('d-none');
    });
  }

  hideMenuButton() {
    this.$$mainMenuButtons.forEach((button) => {
      !button.classList.contains('nav-bar__signin-button') && button.classList.add('d-none');
    });
  }
}

export default App;
