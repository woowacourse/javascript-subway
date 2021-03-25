import { AUTH } from '../constants/alertMessage';
import { requestLogin } from '../services/auth';
import store, { initPrivateStore } from '../store';
import { $, showElement } from '../utils/dom';
import { routeTo } from '../utils/history';

export const login = async (email, password, option) => {
  const response = await requestLogin({ email, password });
  const { keepLogin } = option;

  if (!response.success) {
    alert(AUTH.LOGIN_FAILED);
    return;
  }

  const newAccessToken = response.accessToken;
  store.accessToken.set(newAccessToken, keepLogin);
};

const handleLogin = async event => {
  event.preventDefault();

  const { email, password, 'keep-login': keepLogin } = event.target.elements;

  await login(email.value, password.value, { keepLogin: keepLogin.checked });

  try {
    await initPrivateStore();
  } catch (error) {
    alert(error.message);
    routeTo('/login');
    return;
  }

  routeTo('/');
  showElement($('#nav'));
};

export default handleLogin;
