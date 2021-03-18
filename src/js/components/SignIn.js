import SignUp from './SignUp.js';

class SignIn {
  constructor(props) {
    this.props = props;
    this.signUp = new SignUp();
  }

  init() {
    this.selectDom();
    this.bindEvent();
  }

  selectDom() {
    this.$signUpBtn = document.querySelector('.sign-up-btn');
  }

  bindEvent() {
    this.$signUpBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.props.route('/signup');
      this.signUp.init();
    });
  }
}

export default SignIn;
