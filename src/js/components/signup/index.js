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
      'keyup',
      async ({ target, currentTarget }) => {
        if (currentTarget['name'] === target) return;

        if (currentTarget['email'] === target) {
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

          return;
        }

        const password = currentTarget['password'].value;
        const passwordConfirm = currentTarget['password-confirm'].value;

        const isSamePassword = password === passwordConfirm;
        $('.js-password-check').innerText = isSamePassword
          ? '비밀번호가 일치합니다.'
          : '비밀번호가 일치하지 않습니다.';
      }
    );

    $('#signup-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = e.target['name'].value;
      const email = e.target['email'].value;
      const password = e.target['password'].value;
      const passwordConfirm = e.target['password-confirm'].value;

      if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      try {
        const response = await request.post(BASE_URL + PATH.MEMBERS.SIGNUP, {
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
}

export default Signup;
