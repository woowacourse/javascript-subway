import store from '../store';
import { routeTo } from '../utils/history';

const handleLogout = () => {
  store.accessToken.clear();
  routeTo('/login');
};

export default handleLogout;
