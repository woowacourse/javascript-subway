import { showSnackbar } from '../../utils/snackbar';
import { ELEMENT, SNACKBAR_SHOW_TIME, SUCCESS_MESSAGE, STANDARD_NUMBER, TYPE_JSON } from '../../utils/constants';
import { $, deactivateTarget } from '../../utils/dom';
import { debounce } from '../../utils/debounce';
import { httpClient } from '../../api/httpClient';
import Email from './Email';
import Password from './Password';

class SignIn {
  constructor(props) {
    this.props = props;
    this.email = new Email();
    this.password = new Password();
  }

  init() {
    this.selectDom();
    this.bindEvent();
    deactivateTarget(this.$signInSubmitButton);
  }

  selectDom() {
    this.$signInForm = $(`.${ELEMENT.SIGN_IN_FORM}`);
    this.$signInSubmitButton = $(`.${ELEMENT.SIGN_IN_SUBMIT_BUTTON}`);
    this.email.selectDom();
    this.password.selectDom();
  }

  bindEvent() {
    this.email.$signInEmailInput.addEventListener('keyup', (e) =>
      debounce(this.email.handleEmailCheck.bind(this.email, e), STANDARD_NUMBER.KEY_UP_CHECK_TIME),
    );
    this.password.$signInPasswordInput.addEventListener('keyup', (e) =>
      debounce(this.password.handlePasswordCheck.bind(this.password, e), STANDARD_NUMBER.KEY_UP_CHECK_TIME),
    );
    this.$signInForm.addEventListener('submit', this.handleSignIn.bind(this));
  }

  handleSignIn(e) {
    e.preventDefault();

    const email = e.target[ELEMENT.EMAIL].value;
    const password = e.target[ELEMENT.PASSWORD].value;

    this.requestSignIn({ email, password });
  }

  async requestSignIn({ email, password }) {
    const signInData = await httpClient.post({
      path: '/login/token',
      body: { email, password },
      returnType: TYPE_JSON,
    });
    if (!signInData) return;

    this.manageSignInSuccess(signInData.accessToken);
  }

  manageSignInSuccess(accessToken) {
    this.props.changeFromSignOutToSignInStatus(accessToken);
    showSnackbar({ message: SUCCESS_MESSAGE.SIGN_IN, showtime: SNACKBAR_SHOW_TIME });
  }
}

export default SignIn;
