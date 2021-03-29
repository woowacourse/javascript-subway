import { routeTo } from '../../../utils/history';
import store, { initPrivateStore } from '../../../store';
import { requestLogin } from '../../../services/auth';
import { AUTH } from '../../../constants/alertMessage';
import { $, showElement } from '../../../utils/dom';

export const login = async (email, password, { keepLogin }) => {
  const response = await requestLogin({ email, password });

  if (!response.success) {
    alert(AUTH.LOGIN_FAILED);
    return false;
  }

  const newAccessToken = response.accessToken;
  store.accessToken.set(newAccessToken, keepLogin);

  return true;
};

const handleLogin = async event => {
  event.preventDefault();

  const { email, password, 'keep-login': keepLogin } = event.target.elements;

  const isSuccess = await login(email.value, password.value, { keepLogin: keepLogin.checked });

  try {
    if (isSuccess) await initPrivateStore();
  } catch (error) {
    alert(error.message);
    routeTo('/login');
    return;
  }

  routeTo('/');
  showElement($('#nav'));
};

export default handleLogin;
