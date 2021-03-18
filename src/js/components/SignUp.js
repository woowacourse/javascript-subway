import { getInvalidSignUpMessage } from '../validators/message.js';

class SignUp {
  constructor() {}

  init() {
    this.selectDom();
    this.bindEvent();
  }

  selectDom() {
    this.$signUpForm = document.querySelector('.signup-form');
  }

  bindEvent() {
    this.$signUpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSignUp(e);
    });
  }

  handleSignUp({ target }) {
    const email = target['email'].value;
    const userName = target['user-name'].value;
    const password = target['password'].value;
    const passwordConfirm = target['password-confirm'].value;

    const invalidSignUpMessage = getInvalidSignUpMessage({ email, userName, password, passwordConfirm });

    if (invalidSignUpMessage !== '') {
      alert(invalidSignUpMessage);

      return;
    }

    // 입력 받고
    // 검증하고
    // 검증 끝난 입력값 서버에 전달
  }
}

export default SignUp;
