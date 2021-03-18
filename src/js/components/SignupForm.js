import { signupRequest } from '../request.js';
import { $, show, hide } from '../utils/dom.js';
import { render } from '../../js/router.js';
import { MESSAGES } from '../constants/constants.js';

export default class SignupForm {
  constructor() {
    this.$inputForm = $('#signup-form');
    this.$emailDuplicatedWarning = $('#email-input-warning');
    this.$password = $('#password');
    this.$passwordConfirm = $('#password-confirm');
    this.$passwordConfirmWarning = $('#password-confirm-error');
    this.$passwordConfirmCorrect = $('#password-confirm-correct');

    this.state = {
      email: '',
      name: '',
      password: '',
    };
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.$inputForm.addEventListener('submit', this.handleSubmit.bind(this));
    this.$password.addEventListener('focusout', this.getPassword.bind(this));
    this.$passwordConfirm.addEventListener(
      'input',
      this.checkPasswordCorrect.bind(this)
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      email: { value: email },
      name: { value: name },
      password: { value: password },
      'password-confirm': { value: passwordConfirm },
    } = event.target.elements;

    this.state = { email, name, password };

    if (this.state.password !== passwordConfirm) return;

    this.submitForm();
  }

  async submitForm() {
    await signupRequest(this.state)
      .then(() => {
        const path = '/login';

        alert(MESSAGES.SIGNUP_SUCCESS);

        history.pushState({ path }, null, path);
        render(path);
      })
      .catch(() => this.warnEmailDuplicated());
  }

  warnEmailDuplicated() {
    show(this.$emailDuplicatedWarning);
  }

  getPassword(event) {
    this.state.password = event.target.value;
  }

  checkPasswordCorrect(event) {
    const passwordConfirm = event.target.value;

    if (this.state.password !== passwordConfirm) {
      show(this.$passwordConfirmWarning);
      hide(this.$passwordConfirmCorrect);
    } else {
      show(this.$passwordConfirmCorrect);
      hide(this.$passwordConfirmWarning);
    }
  }
}
