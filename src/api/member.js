export const requestLoginToken = async (email, password) => {
  const response = await fetch(`${API_END_POINT}/login/token`, {
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
  const response = await fetch(`${API_END_POINT}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ email, name, password }),
  });

  // TODO: API 개선되면 로그인 에러 분기 넣기
  if (!response.ok) {
    throw new Error('회원가입 실패');
  }
};
