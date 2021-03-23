import { $ } from '../../utils/DOM.js';
import { BASE_URL, PATH } from '../../constants/url.js';
import Component from '../../core/Component.js';
import request from '../../utils/fetch.js';
import mainTemplate from './template/main.js';
import ValidationError from '../../error/ValidationError.js';
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from '../../constants/message.js';
import REGEX from '../../constants/regex.js';
import { LENGTH } from '../../constants/standard.js';
import HEADERS from '../../constants/headers.js';
class Signup extends Component {
  constructor(parentNode) {
    super(parentNode);
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
          const $nameCheck = $('.js-name-check');

          try {
            this.validateName(target.value);
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
          return;
        }

        if (currentTarget['email'] === target) {
          const $emailCheck = $('.js-email-check');

          try {
            await this.validateEmail(target.value);
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
          return;
        }

        if (
          currentTarget['password'] === target ||
          currentTarget['password-confirm'] === target
        ) {
          const $passwordCheck = $('.js-password-check');
          const password = currentTarget['password'].value;
          const passwordConfirm = currentTarget['password-confirm'].value;

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
        await request.post(BASE_URL + PATH.MEMBERS.SIGNUP, {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
          },
          body: JSON.stringify({
            name: e.target['name'].value,
            email: e.target['email'].value,
            password: e.target['password'].value,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    });
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

  async validateEmail(email) {
    if (!this.isValidEmailFormat(email)) {
      throw new ValidationError(ERROR_MESSAGE.SIGNUP.EMAIL.FORMAT);
    }

    const query = { email };
    const searchParams = `?${new URLSearchParams(query)}`;

    const response = await request.get(
      BASE_URL + PATH.MEMBERS.CHECK + searchParams
    );

    if (response.status === 422) {
      throw new ValidationError(ERROR_MESSAGE.SIGNUP.EMAIL.DUPLICATED);
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
}

export default Signup;
