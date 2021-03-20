import UserAuth from './models/UserAuth';
import UserSession from './models/UserSession';

export default class Store {
  constructor() {
    this.userSession = new UserSession();
    this.state = {
      user: new UserAuth(),
    };
  }

  updateLoggedIn(state) {
    this.userSession.isLoggedIn = state;
  }

  updateUserName(name) {
    this.state.user.name = name;
  }
}
