import { ALERT_MESSAGE } from '../constants';
import { requestLogin } from '../services/auth';
import accessToken from '../store/accessToken';
import { $, showElement } from '../utils/dom';
import { routeTo } from '../utils/history';

export const login = async (email, password) => {
  const response = await requestLogin({ email, password });

  if (!response.success) {
    alert(ALERT_MESSAGE.LOGIN_FAILED);
    return;
  }

  const newAccessToken = response.accessToken;
  accessToken.set(newAccessToken);
};

const handleLogin = async event => {
  event.preventDefault();

  const { email, password } = event.target.elements;
  login(email.value, password.value);

  showElement($('#nav'));
  routeTo('/');
};

export default handleLogin;
