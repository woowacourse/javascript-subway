import Stations from '../components/Stations.js';
import Lines from './Lines.js';
import Sections from './Sections.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Router from '../router/Router.js';
import { ELEMENT, MENU_TITLE, PATH, SESSION_KEY_TOKEN } from '../utils/constants.js';

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
    this.$app = document.querySelector(`.${ELEMENT.APP}`);
    this.$mainScreen = document.querySelector(`.${ELEMENT.MAIN_SCREEN}`);
    this.$signInButton = document.querySelector(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`);
    this.$$mainMenuButtons = document.querySelectorAll(`.${ELEMENT.NAV_BAR} .${ELEMENT.MAIN_MENU_ROUTER}`);
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
    return target.matches(`.${ELEMENT.MAIN_MENU_ROUTER}`);
  }

  async handleSelectMenu(e) {
    const path = e.target.closest('a').getAttribute('href');
    await this.router.route(path);

    this.runPathMatchedAction(path);
  }

  runPathMatchedAction(path) {
    const pathActions = {
      [PATH.SIGNIN]: () => {
        this.signIn.init();
      },
      [PATH.SIGNUP]: () => {
        this.signUp.init();
      },
      [PATH.SIGNOUT]: () => {
        this.changeSignOutToSignInStatus();
        this.router.route(PATH.MAIN);
      },
    };

    pathActions[path]?.();
  }

  changeSignInToSignOutStatus(accessToken) {
    sessionStorage.setItem(SESSION_KEY_TOKEN, accessToken);
    this.$signInButton.innerText = MENU_TITLE.SIGN_OUT;
    this.$signInButton.closest('a').href = PATH.SIGNOUT;
    this.showMenuButton();
  }

  changeSignOutToSignInStatus() {
    sessionStorage.removeItem(SESSION_KEY_TOKEN);
    this.$signInButton.innerText = MENU_TITLE.SIGN_IN;
    this.$signInButton.closest('a').href = PATH.SIGNIN;
    this.hideMenuButton();
  }

  showMenuButton() {
    this.$$mainMenuButtons.forEach((button) => {
      button.classList.remove('d-none');
    });
  }

  hideMenuButton() {
    this.$$mainMenuButtons.forEach((button) => {
      !button.classList.contains(`${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`) && button.classList.add('d-none');
    });
  }
}

export default App;
