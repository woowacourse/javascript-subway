import { COOKIE_KEY } from './constants';

const jwtToken = {
  jwtToken: '',

  getToken() {
    this.jwtToken = document.cookie.replace(`${COOKIE_KEY.JWT_TOKEN}=`, '');

    return this.jwtToken ?? '';
  },

  setToken(token = '') {
    this.jwtToken = token;
    document.cookie = `${COOKIE_KEY.JWT_TOKEN}=${this.jwtToken}`;
  },
};

export default jwtToken;
