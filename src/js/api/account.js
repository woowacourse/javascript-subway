import { INVALID_MESSAGE } from '../constants/message';
import { PATH } from '../constants/url';
import ValidationError from '../error/ValidationError';
import request from '../utils/request';
import getFetchParams from './getFetchParams';

const login = async function (email, password) {
  const params = getFetchParams({
    path: PATH.MEMBERS.LOGIN,
    body: { email, password },
  });
  const response = await request.post(params);

  if (response.status === 400) {
    throw new ValidationError(INVALID_MESSAGE.LOGIN.FAILED);
  }

  if (!response.ok) throw Error(response.message);

  const { accessToken } = await response.json();
  return accessToken;
};

const signup = async function (name, email, password) {
  const params = getFetchParams({
    path: PATH.MEMBERS.SIGNUP,
    body: { name, email, password },
  });

  const response = await request.post(params);
  if (!response.ok) throw Error(response.message);
};

export { login, signup };
