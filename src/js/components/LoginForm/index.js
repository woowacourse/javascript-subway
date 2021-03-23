import { $, show } from '../../utils/dom.js';
import { setCookie } from '../../utils/cookie.js';
import getAvailablePath from '../../utils/path.js';
import routeTo from '../../router.js';
import { loginRequest } from '../../request.js';
import { SELECTOR, SESSION_EXPIRE_DAYS } from '../../constants/constants.js';
import loginTemplate from './template.js';

export default class LoginForm {
  constructor(store) {
    this.store = store;
    this.$content = $(SELECTOR.CONTENT);
    this.state = {
      email: '',
      password: '',
    };
  }

  init() {
    this.render();
    this.selectDOM();
    this.bindEvents();
  }

  render() {
    this.$content.innerHTML = loginTemplate;
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

    routeTo(getAvailablePath(path, this.store.isLoggedIn));
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
      routeTo(getAvailablePath(path, this.store.isLoggedIn));
    } catch (error) {
      console.error(error);
      this.warnLoginError();
    }
  }

  warnLoginError() {
    show(this.$loginErrorWarning);
  }
}
