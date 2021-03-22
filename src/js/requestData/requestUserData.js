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
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusCode);
      }

      return res.ok;
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
  try {
    const response = await fetch(`${API_END_POINT}/members`, {
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

    if (!response.ok) {
      throw new Error(response.status);
    }
  } catch (error) {
    throw new Error(error);
  }
};
