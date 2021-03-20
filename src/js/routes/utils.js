import { requestCheckLogin } from '../services/auth';
import { routeTo } from '../utils/history';

export const authenticatedRoute = async route => {
  const isLogin = await requestCheckLogin();

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
