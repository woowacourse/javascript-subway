import localStorageKey from '../constants/localStorage';

const isLogin = () => {
  return localStorage.getItem(localStorageKey.ACCESSTOKEN);
};

export default isLogin;
