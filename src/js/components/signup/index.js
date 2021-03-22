import { $ } from '../../utils/DOM.js';
import { BASE_URL, PATH } from '../../constants/url.js';
import Component from '../../core/Component.js';
import request from '../../utils/fetch.js';
import mainTemplate from './template/main.js';
class Signup extends Component {
  constructor(parentNode) {
    super(parentNode);
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
      ({ target, currentTarget }) => {
        if (currentTarget['name'] === target) {
          if (!this.validateName(target.value)) {
            $('.js-name-check').innerText =
              '특수문자와 숫자는 입력하실 수 없습니다.';
            return;
          }

          if (target.value.length < 2) {
            $('.js-name-check').innerText = '이름은 두글자 이상이어야 합니다.';
            return;
          }
        }

        if (currentTarget['email'] === target) {
          this.validateEmail(target);
          return;
        }

        this.validatePassword(currentTarget);
        // TODO: Flag 만들어서 사용해야 함
        currentTarget['submit'].disabled = false;
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

  async validateEmail(target) {
    if (!this.isValidEmailFormat(target.value)) {
      $('.js-email-check').innerText = '올바른 이메일 형식이 아닙니다.';
      return;
    }

    const query = { email: target.value };
    const searchParams = `?${new URLSearchParams(query)}`;

    try {
      const response = await request.get(
        BASE_URL + PATH.MEMBERS.CHECK + searchParams
      );

      if (response.status === 422) {
        $('.js-email-check').innerText = '이미 존재하는 이메일입니다.';
        throw Error('email is already registered');
      }

      if (response.status === 200) {
        $('.js-email-check').innerText = '사용 가능한 이메일입니다.';
      }
    } catch (error) {
      console.error(error);
    }
  }

  validateName(name) {
    const re = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z]/;
    return re.test(name);
  }

  validatePassword(currentTarget) {
    const password = currentTarget['password'].value;
    const passwordConfirm = currentTarget['password-confirm'].value;

    if (password.length < 6 || password.length > 20) {
      $('.js-password-check').innerText =
        '비밀번호는 6 이상 20 이하여야 합니다.🥺';
      return;
    }

    const isSamePassword = password === passwordConfirm;
    $('.js-password-check').innerText = isSamePassword
      ? '비밀번호가 일치합니다.'
      : '비밀번호가 일치하지 않습니다.';
  }

  isValidEmailFormat(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
}

export default Signup;
