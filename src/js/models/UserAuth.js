export default class UserAuth {
  constructor(accessToken, name) {
    this._accessToken = accessToken;
    this._name = name;
  }

  get accessToken() {
    return this._accessToken;
  }

  get name() {
    return this._name;
  }

  set accessToken(token) {
    this._accessToken = token;
  }

  set name(name) {
    this._name = name;
  }
}
