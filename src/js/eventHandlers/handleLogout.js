import accessToken from '../store/accessToken';
import { pushState } from '../utils/history';

const handleLogout = () => {
  accessToken.clear();
  pushState('/login');
};

export default handleLogout;
