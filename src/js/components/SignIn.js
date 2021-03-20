import { request } from '../utils/request';
import Router from '../router/Router';
import { SIGN_IN, ELEMENT, PATH, API_END_POINT, TYPE, METHOD } from '../utils/constants.js';

class SignIn {
  constructor(props) {
    this.props = props;
  }

  init() {
    this.selectDom();
    this.bindEvent();
  }

  selectDom() {
    this.$signInForm = document.querySelector(`.${ELEMENT.SIGN_IN_FORM}`);
  }

  bindEvent() {
    this.$signInForm.addEventListener('submit', (e) => {
      e.preventDefault();

      this.handleSignIn(e.target);
    });
  }

  handleSignIn(target) {
    const email = target[ELEMENT.EMAIL].value;
    const password = target[ELEMENT.PASSWORD].value;

    this.requestSignIn({ email, password });
  }

  requestSignIn({ email, password }) {
    request({
      uri: `${API_END_POINT}/login/token`,
      method: METHOD.POST,
      type: TYPE.JSON,
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
        this.manageSignInFail(error);
      });
  }

  manageSignInSuccess(accessToken) {
    const router = new Router();
    router.route(PATH.MAIN);

    this.props.changeSignInToSignOutStatus(accessToken);
  }

  manageSignInFail(error) {
    this.getMatchedAlert(error.message);
  }

  getMatchedAlert(statusCode) {
    const errorMessage = SIGN_IN.ERROR_ALERT_MATCH[statusCode];

    if (!errorMessage) {
      alert(SIGN_IN.FAIL_MESSAGE);
      return;
    }

    alert(errorMessage);
  }
}

export default SignIn;
