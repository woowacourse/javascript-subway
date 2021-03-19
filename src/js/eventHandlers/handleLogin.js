import { ALERT_MESSAGE } from '../constants';
import { login } from '../services/auth';
import accessToken from '../store/accessToken';
import { $, showElement } from '../utils/dom';
import { routeTo } from '../utils/history';

const handleLogin = async event => {
  event.preventDefault();

  const { email, password } = event.target.elements;

  const response = await login({
    email: email.value,
    password: password.value,
  });

  if (!response.success) {
    alert(ALERT_MESSAGE.LOGIN_FAILED);
    return;
  }

  const newAccessToken = response.accessToken;

  accessToken.set(newAccessToken);
  showElement($('#nav'));
  routeTo('/');
};

export default handleLogin;
