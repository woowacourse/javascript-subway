import { $ } from '../../utils/DOM';
import Component from '../../core/Component';
import mainTemplate from './template';
import ValidationError from '../../error/ValidationError';
import { VALID_MESSAGE, INVALID_MESSAGE } from '../../constants/message';
import REGEX from '../../constants/regex';
import { LENGTH } from '../../constants/standard';
import { AUTHENTICATED_LINK } from '../../constants/link';
import { publicApis } from '../../api';

class Signup extends Component {
  constructor({ parentNode }) {
    super({ parentNode });
    this.formValidationFlag = { name: false, email: false, password: false };
  }

  renderSelf() {
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
        await this.login(email, password);
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
      $nameCheck.innerText = VALID_MESSAGE.NAME;
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
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.NAME.FORMAT);
    }

    if (name.length < LENGTH.NAME.MIN || name.length > LENGTH.NAME.MAX) {
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.NAME.LENGTH);
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
      $emailCheck.innerText = VALID_MESSAGE.EMAIL;
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
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.EMAIL.FORMAT);
    }

    const emailQuery = `?${new URLSearchParams(email)}`;

    const response = await publicApis.CheckDuplicatedEmail({ emailQuery });

    if (response.status === 422) {
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.EMAIL.DUPLICATED);
    }
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
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.PASSWORD.LENGTH);
    }

    const isSamePassword = password === passwordConfirm;

    if (!isSamePassword) {
      throw new ValidationError(INVALID_MESSAGE.SIGNUP.PASSWORD.MATCHED);
    }
  }

  async signup(name, email, password) {
    const body = { name, email, password };
    const response = await publicApis.signup({ body });

    if (!response.ok) throw Error(response.message);
  }

  async login(email, password) {
    const body = {
      email,
      password,
    };

    const response = await publicApis.login({ body });

    if (!response.ok) throw Error(response.message);

    const { accessToken } = await response.json();

    localStorage.setItem('accessToken', accessToken);
    this.setIsLogin(true);

    this.goPage(AUTHENTICATED_LINK.STATION.ROUTE);
  }
}

export default Signup;
