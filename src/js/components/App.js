import { $ } from "../utils/DOM.js";
import Header from "./Header.js";
import LoginForm from "./LoginForm.js";

export default class App {
  constructor() {
    this.isLoggedIn = false;

    this.header = new Header({ $parent: $("header") });
    this.loginForm = new LoginForm({
      $parent: $("main"),
      setIsLoggedIn: this.setIsLoggedIn.bind(this),
    });
  }

  setIsLoggedIn(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;

    this.render();
  }

  render() {
    if (this.isLoggedIn) {
      // TODO: 메인 페이지 렌더링
    } else {
      this.loginForm.render();
    }
  }
}
