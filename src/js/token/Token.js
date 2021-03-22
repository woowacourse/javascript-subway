import { SESSION_KEY_TOKEN } from '../utils/constants';

class Token {
  constructor() {
    this.initState();
  }

  initState() {
    this.accessToken = this.getToken() ?? '';
  }

  setToken(accessToken) {
    this.accessToken = accessToken;
    sessionStorage.setItem(SESSION_KEY_TOKEN, accessToken);
  }

  removeToken() {
    this.accessToken = '';
    sessionStorage.removeItem(SESSION_KEY_TOKEN);
  }

  getToken() {
    return sessionStorage.getItem(SESSION_KEY_TOKEN);
  }
}

export default new Token();
