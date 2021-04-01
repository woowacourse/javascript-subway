import { $ } from '../../utils/DOM.js';
import { MESSAGE, SNACKBAR_MESSAGE } from '../../constants/messages.js';
import { COOKIE_KEY } from '../../constants/constants.js';
import { PATH } from '../../constants/path.js';
import { fetchLogin } from '../../API/auth.js';
import jwtToken from '../../jwtToken.js';
import loginTemplate from './loginTemplate.js';
import {
  checkEmailInputHandler,
  checkPasswordInputHandler,
} from '../../authHandlers.js';
import showSnackBar from '../../utils/snackbar.js';
import router from '../../router.js';
import LoginView from './LoginView.js';
import { loginHandler } from './LoginHandlers.js';

class LoginController {
  constructor() {
    this.loginView = new LoginView();
  }

  init() {
    this.loginView.init();
    this.bindEvents();
  }

  async onLoginBtnClick(e) {
    e.preventDefault();

    await loginHandler(e);
  }

  bindCheckInputEvents() {
    $('#email').addEventListener('keyup', checkEmailInputHandler.bind(this));
    $('#password').addEventListener(
      'keyup',
      checkPasswordInputHandler.bind(this)
    );
  }

  bindEvents() {
    this.bindCheckInputEvents();

    $('#login-form').addEventListener(
      'submit',
      this.onLoginBtnClick.bind(this)
    );
    $('#signup').addEventListener('click', e => {
      e.preventDefault();

      router.navigate(PATH.SIGNUP);
    });
  }
}

export default LoginController;
