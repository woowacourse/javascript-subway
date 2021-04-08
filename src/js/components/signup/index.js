import { $ } from '../../utils/DOM.js';
import { PATH } from '../../constants/url.js';
import Component from '../../core/Component.js';
import request from '../../utils/request.js';
import mainTemplate from './template/main.js';
import ValidationError from '../../error/ValidationError.js';
import { VALID_MESSAGE, INVALID_MESSAGE } from '../../constants/message.js';
import REGEX from '../../constants/regex.js';
import LENGTH from '../../constants/standard.js';
import { AUTHENTICATED_LINK } from '../../constants/link.js';
import getFetchParams from '../../api/getFetchParams.js';
import { login, signup } from '../../api/apis.js';
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
          this.validatePasswordAndNotify(password, passwordConfirm, target);
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

        await signup(name, email, password);
        const accessToken = await login(email, password);
        this.stateManagers.accessToken.setToken(await accessToken);
        this.stateManagers.route.goPage(AUTHENTICATED_LINK.STATION.ROUTE);
      } catch (error) {
        console.error(error);
      }
    });
  }

  validateNameAndNotify(name, target) {
    const $nameCheck = $('.js-name-check');

    try {
      this.validateName(name);
      $nameCheck.classList.add('correct');
      $nameCheck.innerText = VALID_MESSAGE.NAME;
      this.formValidationFlag.name = true;
      target.classList.add('valid__input');
      target.classList.remove('invalid__input');
    } catch (error) {
      if (error instanceof ValidationError) {
        $nameCheck.classList.remove('correct');
        $nameCheck.innerText = error.message;
        this.formValidationFlag.name = false;
        target.classList.add('invalid__input');
        target.classList.remove('valid__input');
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
      $emailCheck.classList.add('correct');
      $emailCheck.innerText = VALID_MESSAGE.EMAIL;
      this.formValidationFlag.email = true;
      target.classList.add('valid__input');
      target.classList.remove('invalid__input');
    } catch (error) {
      if (error instanceof ValidationError) {
        $emailCheck.classList.remove('correct');
        $emailCheck.innerText = error.message;
        this.formValidationFlag.email = false;
        target.classList.add('invalid__input');
        target.classList.remove('valid__input');
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

  validatePasswordAndNotify(password, passwordConfirm, target) {
    const $passwordCheck = $('.js-password-check');

    try {
      this.validatePassword(password, passwordConfirm);
      $passwordCheck.classList.add('correct');
      $passwordCheck.innerText = VALID_MESSAGE.PASSWORD;
      this.formValidationFlag.password = true;
      target.classList.add('valid__input');
      target.classList.remove('invalid__input');
    } catch (error) {
      if (error instanceof ValidationError) {
        $passwordCheck.classList.remove('correct');
        $passwordCheck.innerText = error.message;
        this.formValidationFlag.password = false;
        target.classList.add('invalid__input');
        target.classList.remove('valid__input');
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
}

export default Signup;
