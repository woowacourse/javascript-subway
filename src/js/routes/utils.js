import { checkLogin } from '../services/auth';
import { routeTo } from '../utils/history';

export const authenticatedRoute = async route => {
  const isLogin = await checkLogin();

  if (isLogin) {
    route();
  } else {
    routeTo('/login');
  }
};

export const unauthenticatedRoute = async route => {
  const isLogin = await checkLogin();

  if (isLogin) {
    routeTo('/');
  } else {
    route();
  }
};
