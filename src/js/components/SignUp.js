import { getInvalidSignUpMessage } from '../validators/message';
import { request } from '../utils/request';
import { showSnackbar } from '../utils/snackbar';
import { API_END_POINT, METHOD, PATH, ELEMENT, SIGN_UP, SUCCESS_MESSAGE, SNACKBAR_SHOW_TIME } from '../utils/constants';
import Router from '../router/Router';
import { $ } from '../utils/dom';

class SignUp {
  constructor() {}

  init() {
    this.selectDom();
    this.bindEvent();
  }

  selectDom() {
    this.$signUpForm = $(`.${ELEMENT.SIGN_UP_FORM}`);
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

    showSnackbar({ message: SUCCESS_MESSAGE.SIGN_UP, showtime: SNACKBAR_SHOW_TIME });
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
