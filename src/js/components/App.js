import Stations from './Stations';
import Lines from './Lines';
import Sections from './Sections';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Router from '../router/Router';
import UserDataManager from '../model/UserDataManager';
import {
  ELEMENT,
  MENU_TITLE,
  PATH,
  SUCCESS_MESSAGE,
  SNACKBAR_SHOW_TIME,
  SIGN_OUT_CONFIRM_MESSAGE,
} from '../utils/constants';
import { $, $$ } from '../utils/dom';
import { showSnackbar } from '../utils/snackbar';
import { isRouterButton, isSignIn } from '../validators/boolean';
import token from '../token/Token';
import { closeModal } from '../utils/modal';

class App {
  constructor() {
    this.selectDom();
    this.bindEvent();
    this.router = new Router(this.$mainScreen);
    this.userDataManager = new UserDataManager();
  }

  init() {
    this.stations = new Stations({ cleanLineCache: this.cleanLineCache.bind(this) });
    this.lines = new Lines();
    this.sections = new Sections();
    this.signIn = new SignIn({
      changeFromSignOutToSignInStatus: this.changeFromSignOutToSignInStatus.bind(this),
    });
    this.signUp = new SignUp({ initializeRoutedPage: this.initializeRoutedPage.bind(this) });

    this.setMainBySignInStatus();
  }

  selectDom() {
    this.$app = $(`.${ELEMENT.APP}`);
    this.$mainScreen = $(`.${ELEMENT.MAIN_SCREEN}`);
    this.$signInButton = $(`.${ELEMENT.NAV_BAR_SIGN_IN_BUTTON}`);
    this.$$mainMenuButtons = $$(`.${ELEMENT.NAV_BAR} .${ELEMENT.MAIN_MENU_ROUTER}`);
  }

  bindEvent() {
    window.addEventListener('popstate', (e) => {
      this.router.render(e.state.path);
    });

    this.$app.addEventListener('click', (e) => {
      if (
        (e.target.classList.contains('modal') && e.target.classList.contains('open')) ||
        e.target.closest('.modal-close')
      ) {
        closeModal($('.modal'));
      }

      if (isRouterButton(e.target)) {
        this.handleSelectMenu(e);
      }
    });
  }

  cleanLineCache() {
    this.lines.cleanCacheLineListTemplate();
  }

  setMainBySignInStatus() {
    const signInUser = isSignIn();

    this.router.route(PATH.MAIN);

    this.$signInButton.innerText = signInUser ? MENU_TITLE.SIGN_OUT : MENU_TITLE.SIGN_IN;
    this.$signInButton.closest('a').href = signInUser ? PATH.SIGNOUT : PATH.SIGNIN;
    signInUser ? this.showMenuButton() : this.hideMenuButton();

    signInUser && this.setInitialUserData();
  }

  setInitialUserData() {
    this.stations.setStationListTemplate();
    this.lines.setLineListTemplate();
  }

  handleSelectMenu(e) {
    e.preventDefault();
    const path = e.target.closest('a').getAttribute('href');

    if (path === PATH.SIGNOUT) {
      this.runSignOutProcess();

      return;
    }

    this.initializeRoutedPage(path);
  }

  initializeRoutedPage(path) {
    this.router.route(path);
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
      [PATH.STATIONS]: () => {
        this.stations.init();
      },
      [PATH.LINES]: () => {
        this.lines.init();
      },
      [PATH.SECTIONS]: () => {
        this.sections.init();
      },
    };

    pathActions[path]?.();
  }

  runSignOutProcess() {
    if (!window.confirm(SIGN_OUT_CONFIRM_MESSAGE)) {
      return;
    }

    this.changeFromSignInToSignOutStatus();
    showSnackbar({ message: SUCCESS_MESSAGE.SIGN_OUT, showtime: SNACKBAR_SHOW_TIME });
  }

  changeFromSignOutToSignInStatus(accessToken) {
    token.setToken(accessToken);
    this.setMainBySignInStatus();
  }

  changeFromSignInToSignOutStatus() {
    token.removeToken();
    this.setMainBySignInStatus();
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
