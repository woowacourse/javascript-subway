import { LOCAL_STORAGE_KEYS } from '../constants';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../utils/localStorage';

const accessToken = {
  value: '',
  init() {
    this.value = getLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  },
  set(newAccessToken) {
    this.value = newAccessToken;
    setLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, this.value);
  },
  clear() {
    this.value = '';
    removeLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  },
  get() {
    return this.value;
  },
};

export default accessToken;
