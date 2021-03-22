import { $ } from '../../utils/DOM.js';
import { BASE_URL, PATH } from '../../constants/url.js';
import Component from '../../core/Component.js';
import request from '../../utils/fetch.js';
import mainTemplate from './template/main.js';
import ValidationError from '../../error/ValidationError.js';
class Signup extends Component {
  constructor(parentNode) {
    super(parentNode);
    this.formValidationFlag = { name: false, email: false, password: false };
  }

  render() {
    this.parentNode.innerHTML = mainTemplate();
  }

  addEventListeners() {
    $('#signup-form')['email'].addEventListener(
      'change',
      async ({ target }) => {
        if (!target['email']) return;
      }
    );

    $('#signup-form').addEventListener(
      'focusout',
      async ({ target, currentTarget }) => {
        if (currentTarget['name'] === target) {
          try {
            this.validateName(target.value);
            $('.js-name-check').innerText = '사용 가능한 이름입니다.';
            this.formValidationFlag.name = true;
          } catch (error) {
            if (error instanceof ValidationError) {
              $('.js-name-check').innerText = error.message;
              this.formValidationFlag.name = false;
            }

            console.error(error);
          }
        }

        if (currentTarget['email'] === target) {
          try {
            await this.validateEmail(target.value);
            $('.js-email-check').innerText = '사용 가능한 이메일입니다.';
            this.formValidationFlag.email = true;
          } catch (error) {
            if (error instanceof ValidationError) {
              $('.js-email-check').innerText = error.message;
              this.formValidationFlag.email = false;
            }

            console.error(error);
          }
          return;
        }

        const password = currentTarget['password'].value;
        const passwordConfirm = currentTarget['password-confirm'].value;
        try {
          this.validatePassword(password, passwordConfirm);
          $('.js-password-check').innerText = '비밀번호가 일치합니다.';
          this.formValidationFlag.password = true;
        } catch (error) {
          if (error instanceof ValidationError) {
            $('.js-password-check').innerText = error.message;
            this.formValidationFlag.password = false;
          }

          console.error(error);
        }
        // TODO: Flag 만들어서 사용해야 함
        console.log(this.formValidationFlag);
        const isValidEveryFormFlag = Object.values(
          this.formValidationFlag
        ).every((flag) => flag);
        console.log(Object.values(this.formValidationFlag));
        console.log(isValidEveryFormFlag);
      }
    );

    $('#signup-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = e.target['name'].value;
      const email = e.target['email'].value;
      const password = e.target['password'].value;

      try {
        await request.post(BASE_URL + PATH.MEMBERS.SIGNUP, {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    });
  }

  async validateEmail(email) {
    if (!this.isValidEmailFormat(email)) {
      throw new ValidationError('올바른 이메일 형식이 아닙니다.');
    }

    const query = { email };
    const searchParams = `?${new URLSearchParams(query)}`;

    const response = await request.get(
      BASE_URL + PATH.MEMBERS.CHECK + searchParams
    );

    if (response.status === 422) {
      throw new ValidationError('이미 존재하는 이메일입니다.');
    }
  }

  validateName(name) {
    if (!this.isValidNameFormat(name)) {
      throw new ValidationError('공백, 특수문자, 숫자는 입력하실 수 없습니다.');
    }

    if (name.length < 2) {
      throw new ValidationError('이름은 두글자 이상이어야 합니다.');
    }
  }

  isValidNameFormat(name) {
    const re = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z]/;
    return re.test(name);
  }

  validatePassword(password, passwordConfirm) {
    if (password.length < 6 || password.length > 20) {
      throw new ValidationError('비밀번호는 6 이상 20 이하여야 합니다.🥺');
    }

    const isSamePassword = password === passwordConfirm;

    if (!isSamePassword) {
      throw new ValidationError('비밀번호가 일치하지 않습니다.🥺');
    }
  }

  isValidEmailFormat(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
}

export default Signup;
