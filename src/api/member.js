import request from './request.js';

export const requestLoginToken = async (email, password) => {
  const response = await request.post({
    url: `${API_END_POINT}/login/token`,
    bodyContent: { email, password },
  });

  const { accessToken } = await response.json();

  if (!response.ok) {
    throw new Error('로그인 실패');
  }

  return accessToken;
};

export const requestSignUp = async (email, name, password) => {
  const response = await request.post({
    url: `${API_END_POINT}/members`,
    bodyContent: { email, name, password },
  });

  if (!response.ok) {
    throw new Error('회원가입 실패');
  }
};
