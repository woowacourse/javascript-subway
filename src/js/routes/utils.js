import { requestCheckLogin } from '../services/auth';
import store from '../store';
import { routeTo } from '../utils/history';

export const authenticatedRoute = async (route, { strictMode } = { strictMode: false }) => {
  const isLogin = strictMode ? await requestCheckLogin() : store.accessToken.get();

  if (isLogin) {
    route();
  } else {
    routeTo('/login');
  }
};

export const unauthenticatedRoute = async route => {
  const isLogin = await requestCheckLogin();

  if (isLogin) {
    routeTo('/');
  } else {
    route();
  }
};
