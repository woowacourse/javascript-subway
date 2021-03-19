import Component from "./Component.js";
import SIGNUP_TEMPLATE from "../templates/signupTemplate.js";

class SignupComponent extends Component {
  constructor(state) {
    super(state);
  }

  render() {
    super.render(SIGNUP_TEMPLATE);
  }

}

export default SignupComponent;
