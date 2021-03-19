import { $, getFormData } from '../../utils/dom.js';
import { request, getPostOption } from '../../utils/api.js';
import { BASE_URL, ACTIONS } from '../../constants.js';
import { checkLoginValid } from './loginValidator.js';

class Login {
  constructor(props) {
    this.props = props;
  }

  init() {
    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$loginForm = $('form[name="login"]');
  }

  bindEvent() {
    this.bindSignUpEvent();
    this.bindLoginEvent();
  }

  bindSignUpEvent() {
    this.$loginForm.addEventListener('click', e => {
      if (!e.target.classList.contains('signup-link')) return;
      e.preventDefault();
      this.props.switchURL(e.target.getAttribute('href'));
    });
  }

  bindLoginEvent() {
    this.$loginForm.addEventListener('submit', e => {
      e.preventDefault();

      this.handleLogin(e.target.elements);
    });
  }

  handleLogin(elements) {
    console.log('handleLogin');
    const formData = getFormData(elements);

    const errorMessage = checkLoginValid(formData);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    this.requestLogin(formData);
  }

  async requestLogin(data) {
    try {
      const requestBody = JSON.stringify({
        email: data.email,
        password: data.password,
      });
      const option = getPostOption(requestBody);
      await request(BASE_URL + ACTIONS.LOGIN, option);
      // TODO : userToken 저장하기
      this.props.switchURL('/');
    } catch (error) {
      const errorMessage = {
        400: '잘못된 이메일 혹은 비밀번호 입니다.',
      };

      alert(errorMessage[error] || '로그인에 실패했습니다. 다시 시도해주세요.');
    }
  }
}

export default Login;
