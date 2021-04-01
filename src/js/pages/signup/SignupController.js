import { $ } from '../../utils/DOM.js';
import { ALERT_MESSAGE } from '../../constants/messages.js';
import { PATH } from '../../constants/path.js';
import {
  checkEmailInputHandler,
  checkNameInputHandler,
  checkPasswordConfirmInputHandler,
  checkPasswordInputHandler,
} from '../../authHandlers.js';
import router from '../../router.js';
import SignupView from './SignupView.js';
import {
  checkDuplicatedEmailHandler,
  signupHandler,
} from './SignupHandlers.js';

class SignupController {
  constructor() {
    this.signupView = new SignupView();
    this.isCheckedEmail = false;
  }

  init() {
    this.signupView.init();
    this.bindEvents();
  }

  async onCheckDuplicatedEmailBtnClick() {
    if (!$('#email-input').classList.contains('success')) return;

    try {
      const response = await checkDuplicatedEmailHandler();

      if (!response.ok) {
        this.signupView.renderFailInput();
        return;
      }

      this.isCheckedEmail = true;
      this.signupView.renderSuccessInput();
    } catch (error) {
      console.error(error);
    }
  }

  async onSignupbtnClick(e) {
    e.preventDefault();

    if (!this.isCheckedEmail) {
      alert(ALERT_MESSAGE.ERROR.NOT_CHECKED_EMAIL);
      return;
    }

    await signupHandler(e);
  }

  bindCheckInputEvents() {
    $('#email').addEventListener('keyup', e => {
      this.isCheckedEmail = false;
      checkEmailInputHandler(e);
    });
    $('#name').addEventListener('keyup', checkNameInputHandler);
    $('#password').addEventListener('keyup', checkPasswordInputHandler);
    $('#password-confirm').addEventListener(
      'keyup',
      checkPasswordConfirmInputHandler
    );
  }

  bindEvents() {
    this.bindCheckInputEvents();

    $('#check-duplicated-email-button').addEventListener(
      'click',
      this.onCheckDuplicatedEmailBtnClick.bind(this)
    );
    $('#signup-form').addEventListener(
      'submit',
      this.onSignupbtnClick.bind(this)
    );

    $('#login').addEventListener('click', e => {
      e.preventDefault();

      router.navigate(PATH.ROOT);
    });
  }
}
export default SignupController;
