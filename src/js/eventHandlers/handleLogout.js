import accessToken from '../store/accessToken';
import { routeTo } from '../utils/history';

const handleLogout = () => {
  accessToken.clear();
  routeTo('/login');
};

export default handleLogout;
