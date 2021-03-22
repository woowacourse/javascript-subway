import { COOKIE_KEY } from '../constants.js';
import jwtToken from '../jwtToken.js';
import headerTemplate from '../templates/header.js';
import { $ } from '../utils/DOM.js';

class MainPage {
  constructor(router) {
    this.$appNavbar = $('#app-navbar');
    this.$navigation = $('#navigation');
    this.$main = $('#main');
    this.router = router;
  }

  init() {
    this.renderView();
    this.bindEvents();
  }

  renderView() {
    this.$appNavbar.innerHTML = `<button id="logout-button" class="btn d-flex ml-auto mr-10 my-auto d-inline-block">로그아웃</button>`;
    this.$navigation.innerHTML = headerTemplate;
    this.$main.innerHTML = '';
  }

  resetView() {
    this.$appNavbar.innerHTML = '';
    this.$navigation.innerHTML = '';
  }

  bindEvents() {
    $('#logout-button').addEventListener('click', e => {
      e.preventDefault();

      this.resetView();

      jwtToken.deleteToken(COOKIE_KEY.JWT_TOKEN);
      this.router.navigate('/');
    });

    this.$navigation.addEventListener('click', e => {
      e.preventDefault();

      const targetPath = e.target.dataset.navPath;
      this.router.navigate(targetPath);
    });
  }
}

export default MainPage;
