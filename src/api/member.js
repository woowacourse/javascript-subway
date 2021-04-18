import { URL } from "../constants.js";
import { sendGetRequest } from '../utils/api.js';

export const requestLoginToken = async (email, password) => {
  const response = await fetch(`${URL.BASE_URL}/login/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const { accessToken, status } = await response.json();
  if (status) {
    throw new Error('로그인 실패');
  }

  return accessToken;
};

export const requestSignUp = async (email, name, password) => {
  const response = await fetch(`${URL.BASE_URL}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ email, name, password }),
  });

  if (!response.ok) {
    throw new Error('회원가입 실패');
  }
};

export const requestUserName = async () => {
  const response = await sendGetRequest(`${URL.BASE_URL}/members/me`);
  const { name } = await response.json();

  if (!response.ok) {
    throw new Error(response.status);
  }

  return name;
}
