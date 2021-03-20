import { $, getFormData } from '../../utils/dom.js';
import { BASE_URL, ACTIONS } from '../../constants.js';
import { request, getPostOption } from '../../utils/api.js';
import { checkSignupValid } from './signupValidator.js';
class SignUp {
  constructor(props) {
    this.props = props;
  }

  init() {
    this.bindSubmitEvent();
  }

  bindSubmitEvent() {
    const $signUpForm = $('form[name="signup"]');

    $signUpForm.addEventListener('submit', e => {
      e.preventDefault();

      this.handleSignup(e.target.elements);
    });
  }

  handleSignup(elements) {
    const formData = getFormData(elements);

    const errorMessage = checkSignupValid(formData);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    this.requestSignup(formData);
  }

  async requestSignup(data) {
    try {
      const requestBody = JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      const option = getPostOption(requestBody);

      await request(BASE_URL + ACTIONS.REGISTER, option);

      this.props.switchURL('/login');
    } catch (error) {
      if (error === 400) {
        alert('중복된 이메일로 가입할 수 없습니다!');
        return;
      }
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  }
}

export default SignUp;
