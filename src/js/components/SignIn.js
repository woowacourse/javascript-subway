class SignIn {
  constructor(props) {
    this.props = props;
  }

  init() {
    this.selectDom();
    this.bindEvent();
  }

  selectDom() {
    this.$signUpBtn = document.querySelector('.sign-up-btn');
  }

  bindEvent() {
    this.$signUpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.props.route('/signup');
    });
  }
}

export default SignIn;
