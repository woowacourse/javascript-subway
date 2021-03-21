let accessToken = localStorage.getItem('accessToken') || '';

const updateAccessToken = (token) => {
  accessToken = token;
  localStorage.setItem('accessToken', token);
};

export const login = (token) => {
  if (typeof token !== 'string' || token === '') {
    throw new Error('유효한 token이 아닙니다.');
  }

  updateAccessToken(token);
};

export const logout = () => {
  updateAccessToken('');
};

export const getAccessToken = () => accessToken;

export const isLoggedIn = () => Boolean(accessToken);
