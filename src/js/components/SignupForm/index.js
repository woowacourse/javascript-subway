import { loginRequest, signupRequest, checkEmailDuplicatedRequest } from '../../request.js';
import { $, show, hide } from '../../utils/dom.js';
import { setCookie } from '../../utils/cookie.js';
import routeTo from '../../router.js';
import { SELECTOR, MESSAGES, SESSION_EXPIRE_DAYS } from '../../constants/constants.js';
import signupTemplate from './template.js';

export default class SignupForm {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
    this.state = {
      email: '',
      name: '',
      password: '',
    };
    this.isEmailAvailable = false;
  }

  init() {
    this.render();
    this.selectDOM();
    this.bindEvents();
  }

  render() {
    this.$content.innerHTML = signupTemplate;
  }

  selectDOM() {
    this.$inputForm = $(SELECTOR.SIGNUP_FORM);
    this.$emailInput = $(SELECTOR.SIGNUP_EMAIL_INPUT);
    this.$emailDuplicatedWarning = $(SELECTOR.EMAIL_INPUT_ERROR);
    this.$emailAvailable = $(SELECTOR.EMAIL_INPUT_CORRECT);
    this.$password = $(SELECTOR.PASSWORD);
    this.$passwordConfirm = $(SELECTOR.PASSWORD_CONFIRM);
    this.$passwordConfirmWarning = $(SELECTOR.PASSWORD_CONFIRM_ERROR);
    this.$passwordConfirmCorrect = $(SELECTOR.PASSWORD_CONFIRM_CORRECT);
  }

  bindEvents() {
    this.$inputForm.addEventListener('submit', this.handleSubmit.bind(this));
    this.$emailInput.addEventListener('focusout', this.checkEmailAvailable.bind(this));
    this.$password.addEventListener('input', this.checkPasswordCorrect.bind(this));
    this.$passwordConfirm.addEventListener('input', this.checkPasswordCorrect.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.isEmailAvailable) return;

    const {
      email: { value: email },
      name: { value: name },
      password: { value: password },
      'password-confirm': { value: passwordConfirm },
    } = event.target.elements;

    this.state = { email, name, password };

    if (this.state.password !== passwordConfirm) return;

    await this.submitForm();
  }

  async checkEmailAvailable(event) {
    const email = event.target.value;

    if (!event.target.reportValidity()) return;

    try {
      await checkEmailDuplicatedRequest(email);

      hide(this.$emailDuplicatedWarning);
      show(this.$emailAvailable);
      this.isEmailAvailable = true;
    } catch (error) {
      console.error(error);
      hide(this.$emailAvailable);
      show(this.$emailDuplicatedWarning);
      this.isEmailAvailable = false;
    }
  }

  async submitForm() {
    try {
      await signupRequest(this.state);

      alert(MESSAGES.SIGNUP_SUCCESS);
      await this.loginAfterSignup();
    } catch (error) {
      console.error(error);
    }
  }

  async loginAfterSignup() {
    const { email, password } = this.state;
    const response = await loginRequest({ email, password });
    const accessToken = response.accessToken;
    const path = '/';
    this.store.userAuth.accessToken = accessToken;

    setCookie({
      key: 'token',
      value: accessToken,
      expireDays: SESSION_EXPIRE_DAYS,
    });

    this.store.updateLoggedIn(true);
    routeTo(path);
  }

  checkPasswordCorrect() {
    if (this.$password.value !== this.$passwordConfirm.value) {
      show(this.$passwordConfirmWarning);
      hide(this.$passwordConfirmCorrect);
    } else {
      show(this.$passwordConfirmCorrect);
      hide(this.$passwordConfirmWarning);
    }
  }
}
