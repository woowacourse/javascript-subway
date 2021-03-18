import { $, show, hide } from '../utils/dom.js';

export default class SignupForm {
  constructor() {
    this.$inputForm = $('#signup-form');
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
    } = event.target.elements;

    this.state = { email, name, password };
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
