export default class UserSession {
  constructor() {
    this._isLoggedIn = false;
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  set isLoggedIn(state) {
    this._isLoggedIn = state;
  }
}
