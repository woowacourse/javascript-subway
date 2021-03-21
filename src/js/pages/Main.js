import { COOKIE_KEY } from '../constants.js';
import jwtToken from '../jwtToken.js';
import headerTemplate from '../templates/header.js';
import { $ } from '../utils/DOM.js';

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
    this.$appNavbar.innerHTML = `<button id="logout-button" class="d-flex ml-auto">로그아웃</button>`;
    this.$navigation.innerHTML = headerTemplate;
  }

  bindEvents() {
    $('#logout-button').addEventListener('click', () => {
      jwtToken.deleteToken(COOKIE_KEY.JWT_TOKEN);
      this.router.navigate('/');

      location.reload();
    });

    this.$navigation.addEventListener('click', e => {
      e.preventDefault();

      const targetPath = e.target.dataset.navPath;
      this.router.navigate(targetPath);
    });
  }
}

export default MainPage;
