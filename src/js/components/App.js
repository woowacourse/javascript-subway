import Header from "./Header.js";
import LoginForm from "./LoginForm.js";
import Stations from "./Stations.js";
import staticElements from "../constants/staticElements.js";

export default class App {
  constructor() {
    this.isLoggedIn = false;

    this.header = new Header({ $parent: staticElements.$header });
    this.stations = new Stations({ $parent: staticElements.$main });
    this.loginForm = new LoginForm({
      $parent: staticElements.$main,
      setIsLoggedIn: this.setIsLoggedIn.bind(this),
    });
  }

  setIsLoggedIn(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;

    this.render();
  }

  render() {
    if (this.isLoggedIn) {
      this.header.show();
      this.stations.render();
    } else {
      this.loginForm.render();
    }
  }
}
