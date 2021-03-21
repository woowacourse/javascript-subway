import Component from "./Component.js";
import LOGIN_TEMPLATE from "../templates/loginTemplate.js";
import $ from "../utils/querySelector.js";
import { CLASS_SELECTOR, ID_SELECTOR } from "../constants.js";

class LoginComponent extends Component {
  constructor(state) {
    super(state);
  }

  initEvent() {
    $(`#${ID_SELECTOR.MAIN} .${CLASS_SELECTOR.ANCHOR}`).addEventListener("click", this._onAnchorClicked)
  }

  render() {
    super.render(LOGIN_TEMPLATE);
  }

}

export default LoginComponent;
