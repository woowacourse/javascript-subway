import { $, show } from '../utils/dom.js';
import { setCookie } from '../utils/cookie.js';
import { render } from '../../js/router.js';
import { loginRequest } from '../request.js';
import { SELECTOR, SESSION_EXPIRE_DAYS } from '../constants/constants.js';

export default class LoginForm {
  constructor(store) {
    this.store = store;
    this.state = {
      email: '',
      password: '',
    };
  }

  init() {
    this.selectDOM();
    this.bindEvents();
  }

  selectDOM() {
    this.$inputForm = $(SELECTOR.LOGIN_INPUT_FORM);
    this.$loginErrorWarning = $(SELECTOR.LOGIN_ERROR_WARNING);
    this.$signupLink = $(SELECTOR.SIGNUP_LINK);
  }

  bindEvents() {
    this.$signupLink.addEventListener('click', this.goSignupForm.bind(this));
    this.$inputForm.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async goSignupForm(event) {
    event.preventDefault();
    const path = event.target.getAttribute('href');

    await render(path, this.store.userSession.isLoggedIn);
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
    try {
      const response = await loginRequest(this.state);
      const userToken = response.accessToken;
      const path = '/';

      setCookie({
        key: 'token',
        value: userToken,
        expireDays: SESSION_EXPIRE_DAYS,
      });

      this.store.updateLoggedIn(true);
      await render(path, this.store.userSession.isLoggedIn);
    } catch (error) {
      console.error(error);
      this.warnLoginError();
    }
  }

  warnLoginError() {
    show(this.$loginErrorWarning);
  }
}
