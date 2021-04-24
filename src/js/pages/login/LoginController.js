import { $ } from '../../utils/DOM.js';
import { PATH } from '../../constants/path.js';
import {
  checkEmailInputHandler,
  checkPasswordInputHandler,
} from '../../common/handlers/authHandlers.js';
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
