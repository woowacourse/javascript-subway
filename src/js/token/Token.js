import { TOKEN_KEY, COOKIE_EXPIRE_TIME } from '../utils/constants';
import { getCookie, setCookie, removeCookie } from '../utils/cookie';

class Token {
  constructor() {
    this.accessToken = this.getToken() ?? '';
  }

  setToken(accessToken) {
    this.accessToken = accessToken;
    setCookie({ key: TOKEN_KEY, value: accessToken, minutes: COOKIE_EXPIRE_TIME });
  }

  removeToken() {
    this.accessToken = '';
    removeCookie(TOKEN_KEY);
  }

  getToken() {
    return getCookie(TOKEN_KEY);
  }
}

export default new Token();
