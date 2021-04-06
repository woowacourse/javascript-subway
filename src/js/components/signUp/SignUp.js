import Email from './Email';
import UserName from './UserName';
import Password from './Password';
import PasswordConfirm from './PasswordConfirm';
import { showSnackbar } from '../../utils/snackbar';
import {
  PATH,
  ELEMENT,
  SUCCESS_MESSAGE,
  SNACKBAR_SHOW_TIME,
  STANDARD_NUMBER,
  ERROR_MESSAGE,
} from '../../utils/constants';
import { $, deactivateTarget } from '../../utils/dom';
import { debounce } from '../../utils/debounce';
import { httpClient } from '../../api/httpClient';

class SignUp {
  constructor(props) {
    this.props = props;
    this.email = new Email();
    this.userName = new UserName();
    this.password = new Password();
    this.passwordConfirm = new PasswordConfirm();
  }

  init() {
    this.selectDom();
    this.bindEvent();
    deactivateTarget(this.$signUpSubmitButton);
  }

  selectDom() {
    this.$signUpForm = $(`.${ELEMENT.SIGN_UP_FORM}`);
    this.$signUpSubmitButton = $(`.${ELEMENT.SIGN_UP_SUBMIT_BUTTON}`);
    this.email.selectDom();
    this.userName.selectDom();
    this.password.selectDom();
    this.passwordConfirm.selectDom();
  }

  bindEvent() {
    this.email.$signUpEmailInput.addEventListener('keyup', (e) =>
      debounce(this.email.handleEmailCheck.bind(this.email, e), STANDARD_NUMBER.KEY_UP_CHECK_TIME),
    );
    this.userName.$signUpUserNameInput.addEventListener('keyup', (e) =>
      debounce(this.userName.handleUserNameCheck.bind(this.userName, e), STANDARD_NUMBER.KEY_UP_CHECK_TIME),
    );
    this.password.$signUpPasswordInput.addEventListener('keyup', (e) =>
      debounce(this.password.handlePasswordCheck.bind(this.password, e), STANDARD_NUMBER.KEY_UP_CHECK_TIME),
    );
    this.passwordConfirm.$signUpPasswordConfirmInput.addEventListener('keyup', (e) =>
      debounce(
        this.passwordConfirm.handlePasswordConfirmCheck.bind(this.passwordConfirm, e),
        STANDARD_NUMBER.KEY_UP_CHECK_TIME,
      ),
    );

    this.$signUpForm.addEventListener('submit', this.handleSignUp.bind(this));
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
