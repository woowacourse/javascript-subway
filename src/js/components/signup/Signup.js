import { $, getFormData } from '../../utils/dom.js';

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

      const formData = getFormData(e.target.elements);

      const message = checkValid(formData);
      if (message) {
        alert(message);
        return;
      }

      // TODO: 유틸화
      fetch('url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: ({ name, email, password } = ,
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          console.log(res.status);
          return Promise.reject(Error(res.status));
        })
        .catch(error => {
          alert('회원가입에 실패했습니다..! ' + error.message);
        })
        .then(res => {
          this.props.switchURL('/login');
        });
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
