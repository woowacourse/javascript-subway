import { getInvalidSignUpMessage } from '../validators/message';
import { showSnackbar } from '../utils/snackbar';
import { PATH, ELEMENT, SIGN_UP, SUCCESS_MESSAGE, SNACKBAR_SHOW_TIME } from '../utils/constants';
import { $ } from '../utils/dom';
import { requestSignUpApprove } from '../requestData/requestUserData';

class SignUp {
  constructor(props) {
    this.props = props;
  }

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

  async requestSignUp({ email, userName, password }) {
    try {
      await requestSignUpApprove({ email, userName, password });
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
