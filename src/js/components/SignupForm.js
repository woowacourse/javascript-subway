import {
  loginRequest,
  signupRequest,
  checkEmailDuplicatedRequest,
} from '../request.js';
import { $, show, hide } from '../utils/dom.js';
import { setCookie } from '../utils/cookie.js';
import { render } from '../../js/router.js';
import {
  SELECTOR,
  MESSAGES,
  SESSION_EXPIRE_DAYS,
} from '../constants/constants.js';

export default class SignupForm {
  constructor(store) {
    this.store = store;
    this.state = {
      email: '',
      name: '',
      password: '',
    };
  }

  init() {
    this.selectDOM();
    this.bindEvents();
  }

  selectDOM() {
    this.$inputForm = $(SELECTOR.SIGNUP_FORM);
    this.$emailDuplicateCheckButton = $(SELECTOR.EMAIL_DUPLICATE_CHECK_BUTTON);
    this.$emailDuplicatedWarning = $(SELECTOR.EMAIL_INPUT_ERROR);
    this.$emailAvailable = $(SELECTOR.EMAIL_INPUT_CORRECT);
    this.$password = $(SELECTOR.PASSWORD);
    this.$passwordConfirm = $(SELECTOR.PASSWORD_CONFIRM);
    this.$passwordConfirmWarning = $(SELECTOR.PASSWORD_CONFIRM_ERROR);
    this.$passwordConfirmCorrect = $(SELECTOR.PASSWORD_CONFIRM_CORRECT);
  }

  bindEvents() {
    this.$inputForm.addEventListener('submit', this.handleSubmit.bind(this));
    this.$emailDuplicateCheckButton.addEventListener(
      'click',
      this.checkEmailAvailable.bind(this)
    );
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

  async checkEmailAvailable() {
    const email = $(SELECTOR.SIGNUP_EMAIL_INPUT).value;
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(emailFormat)) return;

    try {
      await checkEmailDuplicatedRequest(email);

      hide(this.$emailDuplicatedWarning);
      show(this.$emailAvailable);
    } catch (error) {
      console.error(error);
      hide(this.$emailAvailable);
      show(this.$emailDuplicatedWarning);
    }
  }

  async submitForm() {
    try {
      await signupRequest(this.state);

      alert(MESSAGES.SIGNUP_SUCCESS);
      this.loginAfterSignup();
    } catch (error) {
      console.error(error);
      show(this.$emailDuplicatedWarning);
    }
  }

  async loginAfterSignup() {
    const { email, password } = this.state;
    const response = await loginRequest({ email, password });
    const userToken = response.accessToken;
    const path = '/stations';

    setCookie({
      key: 'token',
      value: userToken,
      expireDays: SESSION_EXPIRE_DAYS,
    });

    this.store.updateLoggedIn(true);
    await render(path, this.store.userSession.isLoggedIn);
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
