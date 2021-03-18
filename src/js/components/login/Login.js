import { $ } from '../../utils/dom.js';
class Login {
  constructor(props) {
    this.props = props;
  }

  init() {
    this.bindSignUpEvent();
  }

  bindSignUpEvent() {
    const $loginForm = $("form[name='login']");
    $loginForm.addEventListener('click', e => {
      e.preventDefault();
      if (!e.target.classList.contains('signup-link')) return;
      this.props.switchURL(e.target.getAttribute('href'));
    });
  }
}

export default Login;
