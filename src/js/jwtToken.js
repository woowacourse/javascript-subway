import { COOKIE_KEY } from './constants/constants';

const jwtToken = {
  jwtToken: '',

  getToken(key = COOKIE_KEY.JWT_TOKEN) {
    // TODO : key 확장성 및 예외처리 고민해보기
    const cookies = document.cookie;
    this.jwtToken = cookies.replace(`${key}=`, '');

    return this.jwtToken ?? '';
  },

  setToken(key = '', value = '') {
    this.jwtToken = value;
    document.cookie = `${key}=${this.jwtToken}`;
  },

  deleteToken(key) {
    this.setToken(key, '');
  },
};

export default jwtToken;
