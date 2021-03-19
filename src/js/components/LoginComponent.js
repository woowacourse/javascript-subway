import Component from "./Component.js";
import LOGIN_TEMPLATE from "../templates/loginTemplate.js";

class LoginComponent extends Component {
  constructor(state) {
    super(state);
  }

  render() {
    super.render(LOGIN_TEMPLATE);
  }

}

export default LoginComponent;
