import { SNACKBAR_MESSAGE } from '../../constants/messages.js';
import { COOKIE_KEY } from '../../constants/constants.js';
import jwtToken from '../../jwtToken.js';
import { logoutButtonTemplate } from './templates/appNavbar.js';
import headerTemplate from './templates/header.js';
import { $ } from '../../utils/DOM.js';
import showSnackBar from '../../utils/snackbar.js';

class MainPage {
  constructor(router) {
    this.$appNavbar = $('#app-navbar');
    this.$navigation = $('#navigation');
    this.router = router;
  }

  init() {
    this.renderView();
    this.bindEvents();
  }

  renderView() {
    this.$appNavbar.innerHTML = logoutButtonTemplate;
    this.$navigation.innerHTML = headerTemplate;
    $('#main').innerHTML = '';
  }

  resetView() {
    this.$appNavbar.innerHTML = '';
    this.$navigation.innerHTML = '';
  }

  logoutHandler(e) {
    e.preventDefault();

    this.resetView();

    jwtToken.deleteToken(COOKIE_KEY.JWT_TOKEN);
    showSnackBar(SNACKBAR_MESSAGE.SUCCESS.LOGOUT);
    this.router.navigate('/');
  }

  navigateHandler(e) {
    e.preventDefault();

    const targetPath = e.target.dataset.navPath;
    this.router.navigate(targetPath);
  }

  bindEvents() {
    $('#logout-button').addEventListener(
      'click',
      this.logoutHandler.bind(this)
    );

    this.$navigation.addEventListener('click', this.navigateHandler.bind(this));
  }
}

export default MainPage;
