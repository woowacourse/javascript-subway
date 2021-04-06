import { validateEmail, validateName, validatePassword, validatePasswordConfirm } from '../validators/validation';
import { showSnackbar } from '../utils/snackbar';
import { PATH, ELEMENT, SUCCESS_MESSAGE, SNACKBAR_SHOW_TIME, STANDARD_NUMBER, ERROR_MESSAGE } from '../utils/constants';
import { $, deactivateTarget } from '../utils/dom';
import { debounce } from '../utils/debounce';
import { renderCheckingArea, inputChecker } from '../inputChecker/inputChecker';
import { httpClient } from '../api/httpClient';

class SignUp {
  constructor(props) {
    this.props = props;
  }

  init() {
    this.selectDom();
    this.bindEvent();
    deactivateTarget(this.$signUpSubmitButton);
  }

  selectDom() {
    this.$signUpForm = $(`.${ELEMENT.SIGN_UP_FORM}`);
    this.$signUpSubmitButton = $(`.${ELEMENT.SIGN_UP_SUBMIT_BUTTON}`);
    this.$signUpEmailInput = $(`.${ELEMENT.SIGN_UP_EMAIL_INPUT}`);
    this.$signUpUserNameInput = $(`.${ELEMENT.SIGN_UP_USER_NAME_INPUT}`);
    this.$signUpPasswordInput = $(`.${ELEMENT.SIGN_UP_PASSWORD_INPUT}`);
    this.$signUpPasswordConfirmInput = $(`.${ELEMENT.SIGN_UP_PASSWORD_CONFIRM_INPUT}`);
    this.$signUpEmailCheckTextArea = $(`.${ELEMENT.SIGN_UP_EMAIL_CHECK_TEXT_AREA}`);
    this.$signUpUserNameCheckTextArea = $(`.${ELEMENT.SIGN_UP_USER_NAME_CHECK_TEXT_AREA}`);
    this.$signUpPasswordCheckTextArea = $(`.${ELEMENT.SIGN_UP_PASSWORD_CHECK_TEXT_AREA}`);
    this.$signUpPasswordConfirmCheckTextArea = $(`.${ELEMENT.SIGN_UP_PASSWORD_CONFIRM_CHECK_TEXT_AREA}`);
  }

  bindEvent() {
    this.$signUpEmailInput.addEventListener('keyup', (e) =>
      debounce(this.handleEmailCheck.bind(this, e), STANDARD_NUMBER.KEY_UP_CHECK_TIME),
    );
    this.$signUpUserNameInput.addEventListener('keyup', (e) =>
      debounce(this.handleUserNameCheck.bind(this, e), STANDARD_NUMBER.KEY_UP_CHECK_TIME),
    );
    this.$signUpPasswordInput.addEventListener('keyup', (e) =>
      debounce(this.handlePasswordCheck.bind(this, e), STANDARD_NUMBER.KEY_UP_CHECK_TIME),
    );
    this.$signUpPasswordConfirmInput.addEventListener('keyup', (e) =>
      debounce(this.handlePasswordConfirmCheck.bind(this, e), STANDARD_NUMBER.KEY_UP_CHECK_TIME),
    );
    this.$signUpForm.addEventListener('submit', this.handleSignUp.bind(this));
  }

  async handleEmailCheck({ target }) {
    const email = target.value;

    const emailValidationCheckPassed = inputChecker.signUp({
      callback: validateEmail.bind(this, email),
      $textArea: this.$signUpEmailCheckTextArea,
      $input: this.$signUpEmailInput,
    });

    if (!emailValidationCheckPassed) return;

    const emailDuplicationCheckPassed = await httpClient.get({
      path: `/members/check-validation?email=${email}`,
      isAlert: false,
    });

    if (!emailDuplicationCheckPassed) {
      renderCheckingArea({
        $textArea: this.$signUpEmailCheckTextArea,
        $input: this.$signUpEmailInput,
        errorMessage: ERROR_MESSAGE.DUPLICATED_EMAIL,
      });
      deactivateTarget(this.$signUpSubmitButton);
    }
  }

  handleUserNameCheck({ target }) {
    inputChecker.signUp({
      callback: validateName.bind(this, target.value),
      $textArea: this.$signUpUserNameCheckTextArea,
      $input: this.$signUpUserNameInput,
    });
  }

  handlePasswordCheck({ target }) {
    const passwordValidationCheckPassed = inputChecker.signUp({
      callback: validatePassword.bind(this, target.value),
      $textArea: this.$signUpPasswordCheckTextArea,
      $input: this.$signUpPasswordInput,
    });

    if (!passwordValidationCheckPassed) return;

    inputChecker.signUp({
      callback: validatePasswordConfirm.bind(this, target.value, this.$signUpPasswordConfirmInput.value),
      $textArea: this.$signUpPasswordConfirmCheckTextArea,
      $input: this.$signUpPasswordConfirmInput,
    });
  }

  handlePasswordConfirmCheck({ target }) {
    inputChecker.signUp({
      callback: validatePasswordConfirm.bind(this, this.$signUpPasswordInput.value, target.value),
      $textArea: this.$signUpPasswordConfirmCheckTextArea,
      $input: this.$signUpPasswordConfirmInput,
    });
  }

  handleSignUp(e) {
    e.preventDefault();

    const email = e.target[ELEMENT.EMAIL].value;
    const userName = e.target[ELEMENT.USER_NAME].value;
    const password = e.target[ELEMENT.PASSWORD].value;

    this.requestSignUp({ email, userName, password });
  }

  async requestSignUp({ email, userName, password }) {
    const signUpSuccess = httpClient.post({
      path: '/members',
      body: { email, password, name: userName },
      alertMessage: ERROR_MESSAGE.SIGN_UP_FAIL,
    });
    if (!signUpSuccess) return;

    this.manageSignUpSuccess();
  }

  manageSignUpSuccess() {
    this.props.initializeRoutedPage(PATH.SIGNIN);

    showSnackbar({ message: SUCCESS_MESSAGE.SIGN_UP, showtime: SNACKBAR_SHOW_TIME });
  }
}

export default SignUp;
