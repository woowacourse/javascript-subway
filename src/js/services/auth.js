import { requestLogin } from '../api/auth';
import store from '../store';

export const login = async (email, password, { keepLogin }) => {
  const response = await requestLogin({ email, password });

  if (!response.success) {
    return false;
  }

  const newAccessToken = response.accessToken;
  store.accessToken.set(newAccessToken, keepLogin);

  return true;
};
