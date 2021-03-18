import Component from '../../core/Component.js';
import mainTemplate from './template/main.js';

class Signup extends Component {
  constructor(parentNode) {
    super(parentNode);
  }

  render() {
    this.parentNode.innerHTML = mainTemplate();
  }

  addEventListeners() {
    $('#signup-form').addEventListeners('submit', (e) => {
      e.preventDefault();
      const email = e.target['email'].value;
      const password = e.target['password'].value;
      const passwordConfirm = e.target['password-confirm'].value;

      // TODO:
      // email형식 검사
      // password/passwordConfirm 같은지 확인
      // request하기
    });
  }
}

export default Signup;
