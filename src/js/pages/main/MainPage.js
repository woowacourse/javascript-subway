import { SNACKBAR_MESSAGE } from '../../constants/messages.js';
import { COOKIE_KEY } from '../../constants/constants.js';
import { PATH } from '../../constants/path.js';
import jwtToken from '../../jwtToken.js';
import { logoutButtonTemplate } from './templates/appNavbar.js';
import headerTemplate from './templates/header.js';
import { $ } from '../../utils/DOM.js';
import showSnackBar from '../../utils/snackbar.js';
import router from '../../router.js';
import subway_emoji from '../../../images/subway_emoji.png';
class MainPage {
  constructor() {
    this.$appNavbar = $('#app-navbar');
    this.$navigation = $('#navigation');
  }

  init() {
    this.renderView();
    this.bindEvents();
  }

  renderView() {
    this.$appNavbar.innerHTML = logoutButtonTemplate;
    this.$navigation.innerHTML = headerTemplate;
    $('#main').innerHTML = `<img src="${subway_emoji}" alt="subway-img">`;
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

    this.$navigation.addEventListener('click', this.navigateHandler.bind(this));
  }
}

export default MainPage;
