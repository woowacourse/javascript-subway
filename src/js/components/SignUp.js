import { getInvalidSignUpMessage, getEmailValidationMessage } from '../validators/message';
import { showSnackbar } from '../utils/snackbar';
import { PATH, ELEMENT, SUCCESS_MESSAGE, SNACKBAR_SHOW_TIME } from '../utils/constants';
import { $ } from '../utils/dom';
import { requestEmailDuplicationCheck, requestSignUpApprove } from '../requestData/requestUserData';

class SignUp {
  constructor(props) {
    this.props = props;
  }

  init() {
    this.selectDom();
    this.bindEvent();
  }

  selectDom() {
    this.$signUpEmailInput = $(`.${ELEMENT.SIGN_UP_EMAIL_INPUT}`);
    this.$signUpUserNameInput = $(`.${ELEMENT.SIGN_UP_USER_NAME_INPUT}`);
    this.$signUpPasswordInput = $(`.${ELEMENT.SIGN_UP_PASSWORD_INPUT}`);
    this.$signUpPasswordConfirmInput = $(`.${ELEMENT.SIGN_UP_PASSWORD_CONFIRM_INPUT}`);
    this.$signUpEmailCheckTextArea = $(`.${ELEMENT.SIGN_UP_EMAIL_CHECK_TEXT_AREA}`);
    this.$signUpUserNameCheckTextArea = $(`.${ELEMENT.SIGN_UP_USER_NAME_CHECK_TEXT_AREA}`);
    this.$signUpPasswordCheckTextArea = $(`.${ELEMENT.SIGN_UP_PASSWORD_CHECK_TEXT_AREA}`);
    this.$signUpPasswordConfirmTextArea = $(`.${ELEMENT.SIGN_UP_PASSWORD_CONFIRM_TEXT_AREA}`);
    this.$signUpForm = $(`.${ELEMENT.SIGN_UP_FORM}`);
  }

  bindEvent() {
    this.$signUpEmailInput.addEventListener('keyup', this.handleEmailCheck.bind(this));
    this.$signUpUserNameInput.addEventListener('keyup', this.handleUserNameCheck.bind(this));
    this.$signUpPasswordInput.addEventListener('keyup', this.handlePasswordCheck.bind(this));
    this.$signUpPasswordConfirmInput.addEventListener('keyup', this.handlePasswordConfirmCheck.bind(this));
    this.$signUpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSignUp(e);
    });
  }

  async handleEmailCheck() {
    try {
      const email = this.$signUpEmailInput.value;
      getEmailValidationMessage(email);
      await requestEmailDuplicationCheck(email);
      this.renderCheckingArea({ $textArea: this.$signUpEmailCheckTextArea, $input: this.$signUpEmailInput });
    } catch (error) {
      this.renderCheckingArea({
        $textArea: this.$signUpEmailCheckTextArea,
        $input: this.$signUpEmailInput,
        errorMessage: error.message,
      });
    }
  }

  renderCheckingArea({ $textArea, $input, errorMessage }) {
    $textArea.innerText = errorMessage ?? '';
    $input.classList.remove('border-green', 'border-red');
    $input.classList.add(`${errorMessage ? 'border-red' : 'border-green'}`);
  }

  handleSignUp({ target }) {
    const email = target[ELEMENT.EMAIL].value;
    const userName = target[ELEMENT.USER_NAME].value;
    const password = target[ELEMENT.PASSWORD].value;
    const passwordConfirm = target[ELEMENT.PASSWORD_CONFIRM].value;

    const userInfo = { email, userName, password, passwordConfirm };

    try {
      getInvalidSignUpMessage(userInfo);
      this.requestSignUp(userInfo);
    } catch (error) {
      alert(error.message);
    }
  }

  async requestSignUp({ email, userName, password }) {
    try {
      await requestSignUpApprove({ email, name: userName, password });
      this.manageSignUpSuccess();
    } catch (error) {
      this.manageSignUpFail(error.message);
    }
  }

  manageSignUpSuccess() {
    this.props.initializeRoutedPage(PATH.SIGNIN);

    showSnackbar({ message: SUCCESS_MESSAGE.SIGN_UP, showtime: SNACKBAR_SHOW_TIME });
  }

  manageSignUpFail(statusCode) {
    this.getMatchedAlert(statusCode);
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
