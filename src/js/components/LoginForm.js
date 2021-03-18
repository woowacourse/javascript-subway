import { $, show } from '../utils/dom.js';
import { render } from '../../js/router.js';
import { loginRequest } from '../request.js';
export default class LoginForm {
  constructor() {
    this.$inputForm = $('#login-form');
    this.$loginErrorWarning = $('#login-error-warning');
    this.$signupLink = $('#signup');

    this.state = {
      email: '',
      password: '',
    };
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.$signupLink.addEventListener('click', this.goSignupForm.bind(this));
    this.$inputForm.addEventListener('submit', this.handleSubmit.bind(this));
  }

  goSignupForm(event) {
    event.preventDefault();
    const path = event.target.getAttribute('href');

    history.pushState({ path }, null, path);
    render(path);
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      email: { value: email },
      password: { value: password },
    } = event.target.elements;

    this.state = { email, password };

    this.submitForm();
  }

  async submitForm() {
    await loginRequest(this.state)
      .then(() => {
        const path = '/stations';

        history.pushState({ path }, null, path);
        render(path);
      })
      .catch(() => this.warnLoginError());
  }

  warnLoginError() {
    show(this.$loginErrorWarning);
  }
}
