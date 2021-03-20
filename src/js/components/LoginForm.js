import { $, show } from '../utils/dom.js';
import { render } from '../../js/router.js';
import { loginRequest } from '../request.js';
import { setCookie } from '../utils/cookie.js';
import { SESSION_EXPIRE_DAYS } from '../constants/constants.js';

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
    this.$inputForm = $('#login-form');
    this.$loginErrorWarning = $('#login-error-warning');
    this.$signupLink = $('#signup');
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
      const path = '/stations';

      setCookie({
        key: 'token',
        value: userToken,
        expireDays: SESSION_EXPIRE_DAYS,
      });

      // TODO: 로그인 -> 로그아웃 으로 텍스트 변경
      this.store.updateLoggedIn({ isLoggedIn: true });
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
