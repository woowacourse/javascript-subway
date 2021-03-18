import { $ } from '../utils/dom.js';
import { render } from '../../js/router.js';

export default class LoginForm {
  constructor() {
    this.$signupLink = $('#signup');
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.$signupLink.addEventListener('click', (e) => {
      e.preventDefault();
      const path = e.target.getAttribute('href');

      history.pushState({ path }, null, path);
      render(path);
    });
  }
}
