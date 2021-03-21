import { API_END_POINT, SESSION_KEY_TOKEN, METHOD, TYPE } from '../utils/constants';
import { request } from '../utils/request';

export const requestCheckLogin = async () => {
  const response = await request({
    uri: `${API_END_POINT}/members/me`,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${window.sessionStorage.getItem(SESSION_KEY_TOKEN)}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusCode);
      }

      return response.ok;
    })
    .catch(() => {
      return false;
    });

  return response;
};

export const requestGetToken = async ({ email, password }) => {
  const response = await request({
    uri: `${API_END_POINT}/login/token`,
    method: METHOD.POST,
    type: TYPE.JSON,
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response;
};

export const requestSignUpApprove = async ({ email, userName, password }) => {
  const response = await request({
    uri: `${API_END_POINT}/members`,
    method: METHOD.POST,
    body: JSON.stringify({
      email,
      password,
      name: userName,
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response;
};
