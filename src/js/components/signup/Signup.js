import { $, getFormData } from '../../utils/dom.js';
import { BASE_URL, ACTIONS } from '../../constants.js';
import { request, getPostOption } from '../../utils/api.js';

class SignUp {
  constructor(props) {
    this.props = props;
  }

  init() {
    this.bindSubmitEvent();
  }

  bindSubmitEvent() {
    const $signUpForm = $('form[name="signup"]');

    $signUpForm.addEventListener('submit', async e => {
      e.preventDefault();

      const formData = getFormData(e.target.elements);

      const message = checkValid(formData);

      if (message) {
        alert(message);
        return;
      }

      const body = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      // TODO: 유틸화
      const registerOption = getPostOption(JSON.stringify(body));

      try {
        await request(BASE_URL + ACTIONS.REGISTER, registerOption);
        this.props.switchURL('/login');
      } catch (error) {
        alert(error.message);
      }
    });
  }
}

const checkValid = ({
  name,
  password,
  ['password-confirm']: passwordConfirm,
}) => {
  switch (true) {
    case isEmpty(name):
      return '이름은 공백이 될 수 없습니다!';

    case isDifferent(password, passwordConfirm):
      return '패스워드가 일치하지 않습니다!';

    default:
      return '';
  }
};

const isEmpty = value => {
  return value.trim().length === 0;
};

const isDifferent = (value1, value2) => {
  return value1 !== value2;
};

export default SignUp;
