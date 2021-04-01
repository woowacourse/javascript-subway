import { SNACKBAR_MESSAGE } from '../../constants/messages.js';
import { COOKIE_KEY } from '../../constants/constants.js';
import { PATH } from '../../constants/path.js';
import jwtToken from '../../jwtToken.js';
import { $ } from '../../utils/DOM.js';
import showSnackBar from '../../utils/snackbar.js';
import router from '../../router.js';
import MainView from './MainView.js';

class MainController {
  constructor() {
    this.mainView = new MainView();
  }

  init() {
    this.mainView.init();
    this.bindEvents();
  }

  logoutHandler(e) {
    e.preventDefault();

    this.mainView.resetView();

    jwtToken.deleteToken(COOKIE_KEY.JWT_TOKEN);
    showSnackBar(SNACKBAR_MESSAGE.SUCCESS.LOGOUT);
    router.navigate(PATH.ROOT);
  }

  navigateHandler(e) {
    e.preventDefault();
    if (!e.target.dataset.navPath) return;

    const targetPath = e.target.dataset.navPath;
    router.navigate(targetPath);
  }

  bindEvents() {
    $('#logout-button').addEventListener(
      'click',
      this.logoutHandler.bind(this)
    );
    $('#navigation').addEventListener('click', this.navigateHandler.bind(this));
  }
}

export default MainController;
