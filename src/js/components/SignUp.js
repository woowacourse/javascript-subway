import { getInvalidSignUpMessage } from '../validators/message.js';
import { request } from '../utils/request.js';
import { API_END_POINT, METHOD, PATH, ELEMENT, SIGN_UP } from '../utils/constants.js';
import Router from '../router/Router.js';

class SignUp {
  constructor() {}

  init() {
    this.selectDom();
    this.bindEvent();
  }

  selectDom() {
    this.$signUpForm = document.querySelector(`.${ELEMENT.SIGN_UP_FORM}`);
  }

  bindEvent() {
    this.$signUpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSignUp(e);
    });
  }

  handleSignUp({ target }) {
    const email = target[ELEMENT.EMAIL].value;
    const userName = target[ELEMENT.USER_NAME].value;
    const password = target[ELEMENT.PASSWORD].value;
    const passwordConfirm = target[ELEMENT.PASSWORD_CONFIRM].value;

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
      uri: `${API_END_POINT}/members`,
      method: METHOD.POST,
      body: JSON.stringify({
        email,
        password,
        name: userName,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(() => {
        this.manageSignUpSuccess();
      })
      .catch((error) => {
        this.manageSignUpFail(error);
      });
  }

  manageSignUpSuccess() {
    const router = new Router();
    router.route(PATH.SIGNIN);
  }

  manageSignUpFail(error) {
    this.getMatchedAlert(error.message);
  }

  getMatchedAlert(statusCode) {
    const errorMessage = SIGN_UP.ERROR_ALERT_MATCH[statusCode];

    if (!errorMessage) {
      alert(SIGN_UP.FAIL_MESSAGE);
      return;
    }

    alert(errorMessage);
  }
}

export default SignUp;
