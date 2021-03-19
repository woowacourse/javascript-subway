import { getInvalidSignUpMessage } from '../validators/message.js';
import { request } from '../utils/request.js';
import { errorAlertMatch, SIGN_UP_FAIL_MESSAGE } from '../utils/constants.js';
import Router from '../router/Router.js';

class SignUp {
  constructor() {}

  init() {
    this.selectDom();
    this.bindEvent();
  }

  selectDom() {
    this.$signUpForm = document.querySelector('.signup-form');
  }

  bindEvent() {
    this.$signUpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSignUp(e);
    });
  }

  handleSignUp({ target }) {
    const email = target['email'].value;
    const userName = target['user-name'].value;
    const password = target['password'].value;
    const passwordConfirm = target['password-confirm'].value;

    const userInfo = { email, userName, password, passwordConfirm };
    const invalidSignUpMessage = getInvalidSignUpMessage(userInfo);

    if (invalidSignUpMessage !== '') {
      alert(invalidSignUpMessage);

      return;
    }

    this.requestSignUp(userInfo);
  }

  requestSignUp({ email, userName, password }) {
    request({
      uri: 'http://15.164.230.130:8080/members',
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        name: userName,
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(() => {
        const router = new Router();
        router.route('/signin');
      })
      .catch((error) => {
        this.getMatchedAlert(error.message);
      });
  }

  getMatchedAlert(statusCode) {
    const errorMessage = errorAlertMatch[statusCode];

    if (!errorMessage) {
      alert(SIGN_UP_FAIL_MESSAGE);
      return;
    }

    alert(errorMessage);
  }
}

export default SignUp;
