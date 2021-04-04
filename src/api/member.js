import { SESSION_STORAGE_KEY, URL } from "../constants";
import { sessionStore } from "../utils/utils";

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
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${URL.BASE_URL}/members/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

  const { name } = await response.json();

  if (!response.ok) {
    throw new Error(response.status);
  }

  return name;
}
