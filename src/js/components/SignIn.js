import { requestGetToken } from '../requestData/requestUserData';
import { showSnackbar } from '../utils/snackbar';
import { ELEMENT, SNACKBAR_SHOW_TIME, SUCCESS_MESSAGE, STANDARD_NUMBER, ERROR_MESSAGE } from '../utils/constants';
import { $, deactivateTarget } from '../utils/dom';
import { debounce } from '../utils/debounce';
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
    this.$signInEmailInput.addEventListener('keyup', (e) =>
      debounce(this.handleEmailCheck.bind(this, e), STANDARD_NUMBER.KEY_UP_CHECK_TIME),
    );
    this.$signInPasswordInput.addEventListener('keyup', (e) =>
      debounce(this.handlePasswordCheck.bind(this, e), STANDARD_NUMBER.KEY_UP_CHECK_TIME),
    );
    this.$signInForm.addEventListener('submit', this.handleSignIn.bind(this));
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

  handleSignIn(e) {
    e.preventDefault();

    const email = e.target[ELEMENT.EMAIL].value;
    const password = e.target[ELEMENT.PASSWORD].value;

    this.requestSignIn({ email, password });
  }

  async requestSignIn({ email, password }) {
    try {
      const accessToken = await requestGetToken({ email, password });
      this.manageSignInSuccess(accessToken);
    } catch (error) {
      this.manageSignInFail();
    }
  }

  manageSignInSuccess(accessToken) {
    this.props.changeFromSignOutToSignInStatus(accessToken);
    showSnackbar({ message: SUCCESS_MESSAGE.SIGN_IN, showtime: SNACKBAR_SHOW_TIME });
  }

  manageSignInFail() {
    alert(ERROR_MESSAGE.SIGN_IN_FAIL);
  }
}

export default SignIn;
