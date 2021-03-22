import { $, getFormData } from '../../utils/dom.js';
import { request, getPostOption } from '../../utils/api.js';
import { BASE_URL, ACTIONS } from '../../constants.js';
import { checkLoginValid } from './loginValidator.js';
import { setLocalStorageItem } from '../../utils/storage.js';
import { loginTemplate } from './loginTemplate.js';

class Login {
  constructor(props) {
    this.props = props;
  }

  init() {}

  getPageInfo() {
    return {
      title: '🚇 로그인',
      contents: {
        main: loginTemplate(),
      },
    };
  }

  initDOM() {
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
      const { accessToken } = await request(BASE_URL + ACTIONS.LOGIN, option);
      setLocalStorageItem('userAccessToken', accessToken);
      this.props.switchURL('/');
      this.props.showSnackbar('로그인 되었습니다 !');
    } catch (error) {
      const errorMessage = {
        400: '잘못된 이메일 혹은 비밀번호 입니다.',
      };

      alert(errorMessage[error] || '로그인에 실패했습니다. 다시 시도해주세요.');
    }
  }
}

export default Login;
