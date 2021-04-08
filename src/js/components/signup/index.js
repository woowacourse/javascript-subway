import { $ } from '../../utils/DOM.js';
import { PATH } from '../../constants/url.js';
import Component from '../../core/Component.js';
import request from '../../utils/request.js';
import mainTemplate from './template/main.js';
import ValidationError from '../../error/ValidationError.js';
import {
  VALID_MESSAGE,
  INVALID_MESSAGE,
  SUCCESS_MESSAGE,
} from '../../constants/message.js';
import REGEX from '../../constants/regex.js';
import LENGTH from '../../constants/standard.js';
import { AUTHENTICATED_LINK } from '../../constants/link.js';
import getFetchParams from '../../api/getFetchParams.js';
import api from '../../api/requestHttp.js';
import { SIGNUP } from '../../constants/selector.js';

class Signup extends Component {
  constructor(parentNode, stateManagers) {
    super(parentNode, stateManagers);
    this.formValidationFlag = { name: false, email: false, password: false };
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate();
  }

  addEventListeners() {
    $(SIGNUP.ID.FORM).addEventListener(
      'focusout',
      async ({ target, currentTarget }) => {
        if (currentTarget['submit'] === target) return;

        if (currentTarget['name'] === target) {
          const name = target.value;
          this.validateNameAndNotify(name, target);

          return;
        }

        if (currentTarget['email'] === target) {
          const email = target.value;
          await this.validateEmailAndNotify(email, target);

          return;
        }

        if (
          currentTarget['password'] === target ||
          currentTarget['password-confirm'] === target
        ) {
          const password = currentTarget['password'].value;
          const passwordConfirm = currentTarget['password-confirm'].value;
          this.validatePasswordAndNotify(
            password,
            passwordConfirm,
            currentTarget['password'],
            currentTarget['password-confirm']
          );
        }
      }
    );

    $(SIGNUP.ID.FORM).addEventListener('submit', async (e) => {
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

        const signupParams = getFetchParams({
          path: PATH.MEMBERS.SIGNUP,
          body: { name, email, password },
        });
        await api.signup(signupParams);

        const loginParams = getFetchParams({
          path: PATH.MEMBERS.LOGIN,
          body: { email, password },
        });
        this.stateManagers.accessToken.setToken(await api.login(loginParams));
        this.stateManagers.route.goPage(AUTHENTICATED_LINK.STATION.ROUTE);

        this.snackbar.show(SUCCESS_MESSAGE.LOGIN);
      } catch (error) {
        this.snackbar.show(error.message);
        console.error(error.message);
      }
    });
  }

  validateNameAndNotify(name, target) {
    const $nameCheck = $('.js-name-check');

    try {
      this.validateName(name);
      $nameCheck.innerText = VALID_MESSAGE.NAME;

      this.formValidationFlag.name = true;
      this.notifyCorrectInput($nameCheck, target);
    } catch (error) {
      if (error instanceof ValidationError) {
        $nameCheck.innerText = error.message;

        this.formValidationFlag.name = false;
        this.notifyIncorrectInput($nameCheck, target);
      }

      console.error(error);
    }
  }

  validateName(name) {
    if (!this.isValidNameFormat(name)) {
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.NAME.FORMAT);
    }

    if (name.length < LENGTH.NAME.MIN || name.length > LENGTH.NAME.MAX) {
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.NAME.LENGTH);
    }
  }

  isValidNameFormat(name) {
    return REGEX.NAME.test(name);
  }

  async validateEmailAndNotify(email, target) {
    const $emailCheck = $('.js-email-check');

    try {
      await this.validateEmail(email);
      $emailCheck.innerText = VALID_MESSAGE.EMAIL;

      this.formValidationFlag.email = true;
      this.notifyCorrectInput($emailCheck, target);
    } catch (error) {
      if (error instanceof ValidationError) {
        $emailCheck.innerText = error.message;

        this.formValidationFlag.email = false;
        this.notifyIncorrectInput($emailCheck, target);
      }

      console.error(error);
    }
  }

  async validateEmail(email) {
    if (!this.isValidEmailFormat(email)) {
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.EMAIL.FORMAT);
    }

    const searchParams = `?${new URLSearchParams({ email })}`;
    const params = getFetchParams({
      path: PATH.MEMBERS.CHECK + searchParams,
    });
    const response = await request.get(params);

    if (response.status === 422) {
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.EMAIL.DUPLICATED);
    }
  }

  validatePasswordAndNotify(
    password,
    passwordConfirm,
    targetPassword,
    targetPasswordConfirm
  ) {
    const $passwordCheck = $('.js-password-check');

    try {
      this.validatePassword(password, passwordConfirm);
      $passwordCheck.innerText = VALID_MESSAGE.PASSWORD;

      this.formValidationFlag.password = true;
      this.notifyCorrectInput(
        $passwordCheck,
        targetPassword,
        targetPasswordConfirm
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        $passwordCheck.innerText = error.message;
        this.formValidationFlag.password = false;

        this.notifyIncorrectInput(
          $passwordCheck,
          targetPassword,
          targetPasswordConfirm
        );
      }

      console.error(error);
    }
  }

  isValidEmailFormat(email) {
    return REGEX.EMAIL.test(email.toLowerCase());
  }

  validatePassword(password, passwordConfirm) {
    if (
      password.length < LENGTH.PASSWORD.MIN ||
      password.length > LENGTH.PASSWORD.MAX
    ) {
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.PASSWORD.LENGTH);
    }

    const isSamePassword = password === passwordConfirm;

    if (!isSamePassword) {
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.PASSWORD.MATCHED);
    }
  }

  notifyCorrectInput($checkText, ...inputs) {
    inputs.forEach((input) => {
      input.classList.add('valid__input');
      input.classList.remove('invalid__input');
    });
    $checkText.classList.add('correct');
  }

  notifyIncorrectInput($checkText, ...inputs) {
    inputs.forEach((input) => {
      input.classList.add('invalid__input');
      input.classList.remove('valid__input');
    });
    $checkText.classList.remove('correct');
  }
}

export default Signup;
