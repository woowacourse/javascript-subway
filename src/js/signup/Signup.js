import signupTemplate from './template.js';
import { $ } from '../utils/DOM.js';

class SignupPage {
  constructor(router) {
    this.$main = $('#main');
    this.router = router;
  }

  init() {
    this.renderView();
  }

  renderView() {
    this.$main.innerHTML = signupTemplate;
  }
}
export default SignupPage;
