import loginTemplate from './template.js';
import { $ } from '../utils/DOM.js';

class LoginPage {
  constructor(router) {
    this.$main = $('#main');
    this.router = router;
  }

  init() {
    this.renderView();
    this.bindEvents();
  }

  renderView() {
    this.$main.innerHTML = loginTemplate;
  }

  bindEvents() {
    $('#signup').addEventListener('click', e => {
      e.preventDefault();

      const path = e.target.getAttribute('href');
      this.router.navigate(path);
    });
  }
}

export default LoginPage;
