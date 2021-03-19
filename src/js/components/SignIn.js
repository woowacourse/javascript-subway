class SignIn {
  constructor() {}

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
    });
  }
}

export default SignIn;
