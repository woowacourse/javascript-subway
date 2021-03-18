import { LOCAL_STORAGE_KEYS } from '../constants';
import { pushState } from '../utils/history';
import { removeLocalStorage } from '../utils/localStorage';

const handleLogout = () => {
  removeLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  pushState('/login');
};

export default handleLogout;
