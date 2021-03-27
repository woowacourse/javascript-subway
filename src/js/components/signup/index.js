import { $ } from '../../utils/DOM.js';
import { PATH } from '../../constants/url.js';
import Component from '../../core/Component.js';
import request from '../../utils/request.js';
import mainTemplate from './template/main.js';
import ValidationError from '../../error/ValidationError.js';
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from '../../constants/message.js';
import REGEX from '../../constants/regex.js';
import { LENGTH } from '../../constants/standard.js';
import { AUTHENTICATED_LINK } from '../../constants/link.js';
import getFetchParams from '../../api/getFetchParams.js';

class Signup extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
    this.formValidationFlag = { name: false, email: false, password: false };
  }

  render() {
    this.parentNode.innerHTML = mainTemplate();
  }

  addEventListeners() {
    $('#signup-form').addEventListener(
      'focusout',
      async ({ target, currentTarget }) => {
        if (currentTarget['submit'] === target) return;

        if (currentTarget['name'] === target) {
          const name = target.value;
          this.validateNameAndNotify(name);

          return;
        }

        if (currentTarget['email'] === target) {
          const email = target.value;
          await this.validateEmailAndNotify(email);

          return;
        }

        if (
          currentTarget['password'] === target ||
          currentTarget['password-confirm'] === target
        ) {
          const password = currentTarget['password'].value;
          const passwordConfirm = currentTarget['password-confirm'].value;
          this.validatePasswordAndNotify(password, passwordConfirm);
        }
      }
    );

    $('#signup-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const inVaildInputName = Object.keys(this.formValidationFlag).find(
        (key) => !this.formValidationFlag[key]
      );

      if (inVaildInputName) {
        e.target[inVaildInputName].focus();
        return;
      }

      try {
        const name = e.target['name'].value;
        const email = e.target['email'].value;
        const password = e.target['password'].value;

        await this.signup(name, email, password);
        await this.loginAfterSignup(email, password);
      } catch (error) {
        console.error(error);
      }
    });
  }

  validateNameAndNotify(name) {
    const $nameCheck = $('.js-name-check');

    try {
      this.validateName(name);
      $nameCheck.classList.add('correct');
      $nameCheck.innerText = CONFIRM_MESSAGE.NAME;
      this.formValidationFlag.name = true;
    } catch (error) {
      if (error instanceof ValidationError) {
        $nameCheck.classList.remove('correct');
        $nameCheck.innerText = error.message;
        this.formValidationFlag.name = false;
      }

      console.error(error);
    }
  }

  validateName(name) {
    if (!this.isValidNameFormat(name)) {
      throw new ValidationError(ERROR_MESSAGE.SIGNUP.NAME.FORMAT);
    }

    if (name.length < LENGTH.NAME.MIN || name.length > LENGTH.NAME.MAX) {
      throw new ValidationError(ERROR_MESSAGE.SIGNUP.NAME.LENGTH);
    }
  }

  isValidNameFormat(name) {
    return REGEX.NAME_FORMAT.test(name);
  }

  async validateEmailAndNotify(email) {
    const $emailCheck = $('.js-email-check');

    try {
      await this.validateEmail(email);
      $emailCheck.classList.add('correct');
      $emailCheck.innerText = CONFIRM_MESSAGE.EMAIL;
      this.formValidationFlag.email = true;
    } catch (error) {
      if (error instanceof ValidationError) {
        $emailCheck.classList.remove('correct');
        $emailCheck.innerText = error.message;
        this.formValidationFlag.email = false;
      }

      console.error(error);
    }
  }

  async validateEmail(email) {
    if (!this.isValidEmailFormat(email)) {
      throw new ValidationError(ERROR_MESSAGE.SIGNUP.EMAIL.FORMAT);
    }

    const query = { email };
    const searchParams = `?${new URLSearchParams(query)}`;

    const params = getFetchParams({
      path: PATH.MEMBERS.CHECK + searchParams,
    });
    const response = await request.get(params);

    if (response.status === 422) {
      throw new ValidationError(ERROR_MESSAGE.SIGNUP.EMAIL.DUPLICATED);
    }
  }

  validatePasswordAndNotify(password, passwordConfirm) {
    const $passwordCheck = $('.js-password-check');

    try {
      this.validatePassword(password, passwordConfirm);
      $passwordCheck.classList.add('correct');
      $passwordCheck.innerText = CONFIRM_MESSAGE.PASSWORD;
      this.formValidationFlag.password = true;
    } catch (error) {
      if (error instanceof ValidationError) {
        $passwordCheck.classList.remove('correct');
        $passwordCheck.innerText = error.message;
        this.formValidationFlag.password = false;
      }

      console.error(error);
    }
  }

  isValidEmailFormat(email) {
    return REGEX.EMAIL_FORMAT.test(email.toLowerCase());
  }

  validatePassword(password, passwordConfirm) {
    if (
      password.length < LENGTH.PASSWORD.MIN ||
      password.length > LENGTH.PASSWORD.MAX
    ) {
      throw new ValidationError(ERROR_MESSAGE.SIGNUP.PASSWORD.LENGTH);
    }

    const isSamePassword = password === passwordConfirm;

    if (!isSamePassword) {
      throw new ValidationError(ERROR_MESSAGE.SIGNUP.PASSWORD.MATCHED);
    }
  }

  async signup(name, email, password) {
    const params = getFetchParams({
      path: PATH.MEMBERS.SIGNUP,
      body: { name, email, password },
    });
    const response = await request.post(params);

    if (!response.ok) throw Error(response.message);
  }

  async loginAfterSignup(email, password) {
    const params = getFetchParams({
      path: PATH.MEMBERS.LOGIN,
      body: { email, password },
    });
    const response = await request.post(params);

    if (!response.ok) throw Error(response.message);

    const { accessToken } = await response.json();

    this.stateManagers.accessToken.setToken(accessToken);
    this.stateManagers.route.goPage(AUTHENTICATED_LINK.STATION.ROUTE);
  }
}

export default Signup;
