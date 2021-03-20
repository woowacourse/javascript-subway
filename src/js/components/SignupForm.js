import { loginRequest, signupRequest } from '../request.js';
import { $, show, hide } from '../utils/dom.js';
import { setCookie } from '../utils/cookie.js';
import { render } from '../../js/router.js';
import { MESSAGES, SESSION_EXPIRE_DAYS } from '../constants/constants.js';

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
    this.$inputForm = $('#signup-form');
    this.$emailDuplicatedWarning = $('#email-input-warning');
    this.$password = $('#password');
    this.$passwordConfirm = $('#password-confirm');
    this.$passwordConfirmWarning = $('#password-confirm-error');
    this.$passwordConfirmCorrect = $('#password-confirm-correct');
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
    try {
      await signupRequest(this.state);

      alert(MESSAGES.SIGNUP_SUCCESS);
      this.loginAfterSignup();
    } catch (error) {
      console.error(error);
      this.warnEmailDuplicated();
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
