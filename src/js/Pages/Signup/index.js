import { $ } from '../../utils/DOM';
import PageComponent from '../../core/PageComponent';
import mainTemplate from './template';
import ValidationError from '../../error/ValidationError';
import { VALID_MESSAGE, INVALID_MESSAGE } from '../../constants/message';
import { LENGTH } from '../../constants/standard';
import Apis from '../../api';
import {
  isValidNameFormat,
  isValidEmailFormat,
} from '../../utils/validateFormat';
import HTTPError from '../../error/HTTPError';
import { UNAUTHENTICATED_LINK } from '../../constants/link';

class Signup extends PageComponent {
  constructor({ parentNode }) {
    super({ parentNode, pathname: UNAUTHENTICATED_LINK.SIGNUP.PATH });
    this.formValidationFlag = { name: false, email: false, password: false };
  }

  renderSelf() {
    this.parentNode.innerHTML = mainTemplate();
  }

  addEventListeners() {
    $('#signup-form').addEventListener(
      'focusout',
      this.validateInput.bind(this)
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

        await Apis.members.signup(name, email, password);
        await Apis.members.login(email, password);
      } catch (error) {
        if (error instanceof HTTPError) {
          error.handleError();
        }

        console.error(error.message);
      }
    });
  }

  async validateInput({ target, currentTarget }) {
    if (currentTarget['submit'] === target) return;

    if (currentTarget['name'] === target) {
      this.validateAndNotify(this.validateName.bind(this), target);
      return;
    }

    if (currentTarget['email'] === target) {
      await this.validateAndNotify(this.validateEmail.bind(this), target);
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

  async validateAndNotify(validate, target) {
    const name = target.name;
    const $check = $(`.js-${name}-check`);

    try {
      await validate(target.value);
      $check.classList.add('correct');
      $check.innerText = VALID_MESSAGE[name.toUpperCase()];
      this.formValidationFlag[name] = true;
    } catch (error) {
      if (error instanceof ValidationError) {
        error.handleError($check);
        this.formValidationFlag[name] = false;
      }

      if (error instanceof HTTPError) {
        error.handleError();
      }

      console.error(error.message);
    }
  }

  validateName(name) {
    if (!isValidNameFormat(name)) {
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.NAME.FORMAT);
    }

    if (name.length < LENGTH.NAME.MIN || name.length > LENGTH.NAME.MAX) {
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.NAME.LENGTH);
    }
  }

  async validateEmail(email) {
    if (!isValidEmailFormat(email)) {
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.EMAIL.FORMAT);
    }

    const emailQuery = `?${new URLSearchParams({ email })}`;
    await Apis.checkDuplicatedEmail(emailQuery);
  }

  validatePasswordAndNotify(password, passwordConfirm) {
    const $passwordCheck = $('.js-password-check');

    try {
      this.validatePassword(password, passwordConfirm);
      $passwordCheck.classList.add('correct');
      $passwordCheck.innerText = VALID_MESSAGE.PASSWORD;
      this.formValidationFlag.password = true;
    } catch (error) {
      if (error instanceof ValidationError) {
        error.handleError($passwordCheck);
        this.formValidationFlag.password = false;
      }

      console.error(error.message);
    }
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
}

export default Signup;
