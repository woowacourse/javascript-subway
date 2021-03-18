import { LOCAL_STORAGE_KEYS } from '../constants';
import { getLocalStorage } from '../utils/localStorage';

const accessToken = {
  value: '',
  init() {
    this.value = getLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  },
  set(newAccessToken) {
    this.value = newAccessToken;
  },
  get() {
    return this.value;
  },
};

export default accessToken;
