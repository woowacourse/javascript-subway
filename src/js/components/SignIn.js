import { request } from '../utils/request';
import Router from '../router/Router';
import { signInErrorAlertMatch, SIGN_IN_FAIL_MESSAGE } from '../utils/constants.js';

class SignIn {
  constructor(props) {
    this.props = props;
  }

  init() {
    this.selectDom();
    this.bindEvent();
  }

  selectDom() {
    this.$signInForm = document.querySelector('.sign-in-form');
  }

  bindEvent() {
    this.$signInForm.addEventListener('submit', (e) => {
      e.preventDefault();

      this.handleSignIn(e);
    });
  }

  handleSignIn({ target }) {
    const email = target['email'].value;
    const password = target['password'].value;

    this.requestSignIn({ email, password });
  }

  requestSignIn({ email, password }) {
    request({
      uri: 'http://15.164.230.130:8080/login/token',
      method: 'POST',
      type: 'json',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(({ accessToken }) => {
        this.manageSignInSuccess(accessToken);
      })
      .catch((error) => {
        this.getMatchedAlert(error.message);
      });
  }

  manageSignInSuccess(accessToken) {
    const router = new Router();
    router.route('/');

    this.props.changeSignInToSignOutStatus(accessToken);
  }

  getMatchedAlert(statusCode) {
    const errorMessage = signInErrorAlertMatch[statusCode];

    if (!errorMessage) {
      alert(SIGN_IN_FAIL_MESSAGE);
      return;
    }

    alert(errorMessage);
  }
}

export default SignIn;
