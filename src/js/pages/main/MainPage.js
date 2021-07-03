import Cookies from 'js-cookie';
import { SNACKBAR_MESSAGE } from '../../constants/messages.js';
import { COOKIE_KEY } from '../../constants/constants.js';
import { PATH } from '../../constants/path.js';
import { logoutButtonTemplate } from './templates/appNavbar.js';
import headerTemplate from './templates/header.js';
import { $ } from '../../utils/DOM.js';
import showSnackBar from '../../utils/snackbar.js';
import router from '../../router.js';

class MainPage {
  constructor() {
    this.$appNavbar = $('#app-navbar');
    this.$navigation = $('#navigation');
  }

  init() {
    this.renderView();
    this.bindEvents();
  }

  resetView() {
    this.$appNavbar.innerHTML = '';
    this.$navigation.innerHTML = '';
  }

  renderView() {
    this.$appNavbar.innerHTML = logoutButtonTemplate;
    this.$navigation.innerHTML = headerTemplate;
    $('#main').innerHTML = '';
  }

  bindEvents() {
    $('#logout-button').addEventListener(
      'click',
      this.logoutHandler.bind(this)
    );

    this.$navigation.addEventListener('click', this.navigateHandler.bind(this));
  }

  navigateHandler(e) {
    e.preventDefault();

    const targetPath = e.target.dataset.navPath;

    if (!targetPath) return;
    router.navigate(targetPath);
  }

  logoutHandler(e) {
    e.preventDefault();

    this.resetView();

    Cookies.remove(COOKIE_KEY.JWT_TOKEN);
    showSnackBar(SNACKBAR_MESSAGE.SUCCESS.LOGOUT);

    router.navigate(PATH.ROOT);
  }
}

export default MainPage;
