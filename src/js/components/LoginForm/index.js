import { $, show } from '../../utils/dom.js';
import { setCookie } from '../../utils/cookie.js';
import getAvailablePath from '../../utils/path.js';
import popSnackbar from '../../utils/snackbar.js';
import routeTo from '../../router.js';
import { loginRequest, userInfoRequest } from '../../request.js';
import { SELECTOR, SESSION_EXPIRE_DAYS, MESSAGES } from '../../constants/constants.js';
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
    this.$inputForm.addEventListener('submit', this.handleSubmit.bind(this));
    this.$signupLink.addEventListener('click', this.goSignupForm.bind(this));
  }

  async goSignupForm(event) {
    event.preventDefault();
    const path = event.target.getAttribute('href');

    routeTo(getAvailablePath(path, this.store.isLoggedIn));
  }

  async handleSubmit(event) {
    event.preventDefault();

    const {
      email: { value: email },
      password: { value: password },
    } = event.target.elements;

    this.state = { email, password };
    await this.submitForm();
  }

  async submitForm() {
    try {
      const response = await loginRequest(this.state);
      const accessToken = response.accessToken;
      const path = '/';

      setCookie({
        key: 'token',
        value: accessToken,
        expireDays: SESSION_EXPIRE_DAYS,
      });

      await this.setCurrentUserInfo(accessToken);
      this.store.updateLoggedIn(true);

      routeTo(getAvailablePath(path, this.store.isLoggedIn));
    } catch (error) {
      console.error(error);
      this.warnLoginError();
    }
  }

  async setCurrentUserInfo(accessToken) {
    try {
      const response = await userInfoRequest(accessToken);

      this.store.userName = response.name;
      this.store.userAuth.accessToken = accessToken;
    } catch (error) {
      console.error(error);
      popSnackbar(MESSAGES.ERROR_FETCH_USER_INFO);
    }
  }

  warnLoginError() {
    show(this.$loginErrorWarning);
  }
}
