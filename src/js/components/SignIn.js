import { requestGetToken } from '../requestData/requestUserData';
import { showSnackbar } from '../utils/snackbar';
import { SIGN_IN, ELEMENT, SNACKBAR_SHOW_TIME, SUCCESS_MESSAGE } from '../utils/constants';
import { $, deactivateTarget } from '../utils/dom';
import { inputChecker } from '../inputChecker/inputChecker';
import { validateEmail, validatePassword } from '../validators/validation';

class SignIn {
  constructor(props) {
    this.props = props;
  }

  init() {
    this.selectDom();
    this.bindEvent();
    deactivateTarget(this.$signInSubmitButton);
  }

  selectDom() {
    this.$signInForm = $(`.${ELEMENT.SIGN_IN_FORM}`);
    this.$signInSubmitButton = $(`.${ELEMENT.SIGN_IN_SUBMIT_BUTTON}`);
    this.$signInEmailInput = $(`.${ELEMENT.SIGN_IN_EMAIL_INPUT}`);
    this.$signInPasswordInput = $(`.${ELEMENT.SIGN_IN_PASSWORD_INPUT}`);
    this.$signInEmailCheckTextArea = $(`.${ELEMENT.SIGN_IN_EMAIL_CHECK_TEXT_AREA}`);
    this.$signInPasswordCheckTextArea = $(`.${ELEMENT.SIGN_IN_PASSWORD_CHECK_TEXT_AREA}`);
  }

  bindEvent() {
    this.$signInEmailInput.addEventListener('keyup', this.handleEmailCheck.bind(this));
    this.$signInPasswordInput.addEventListener('keyup', this.handlePasswordCheck.bind(this));
    this.$signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSignIn(e.target);
    });
  }

  handleEmailCheck({ target }) {
    inputChecker.signIn({
      callback: validateEmail.bind(this, target.value),
      $textArea: this.$signInEmailCheckTextArea,
      $input: this.$signInEmailInput,
    });
  }

  handlePasswordCheck({ target }) {
    inputChecker.signIn({
      callback: validatePassword.bind(this, target.value),
      $textArea: this.$signInPasswordCheckTextArea,
      $input: this.$signInPasswordInput,
    });
  }

  handleSignIn(target) {
    const email = target[ELEMENT.EMAIL].value;
    const password = target[ELEMENT.PASSWORD].value;

    this.requestSignIn({ email, password });
  }

  async requestSignIn({ email, password }) {
    try {
      const accessToken = await requestGetToken({ email, password });
      this.manageSignInSuccess(accessToken);
    } catch (error) {
      this.manageSignInFail(error.message);
    }
  }

  manageSignInSuccess(accessToken) {
    this.props.changeFromSignOutToSignInStatus(accessToken);
    showSnackbar({ message: SUCCESS_MESSAGE.SIGN_IN, showtime: SNACKBAR_SHOW_TIME });
  }

  manageSignInFail(statusCode) {
    this.getMatchedAlert(statusCode);
  }

  getMatchedAlert(statusCode) {
    const errorMessage = SIGN_IN.STATUS_CODE_MATCHED_ERROR_MESSAGE[statusCode];

    if (!errorMessage) {
      alert(SIGN_IN.FAIL_MESSAGE);
      return;
    }

    alert(errorMessage);
  }
}

export default SignIn;
