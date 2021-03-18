const END_POINT = "http://15.164.230.130:8080";
const HEADERS = {
  "Content-Type": "application/json; charset=UTF-8",
};
const PATH = {
  MEMBERS: "/members",
  LOGIN: "/login/token",
};

const getURL = (path) => `${END_POINT}${path}`;

export const signupAPI = async ({ email, password, name }) => {
  const response = await fetch(getURL(PATH.MEMBERS), {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });

  return response.ok;
};

export const loginAPI = async ({ email, password }) => {
  const response = await fetch(getURL(PATH.LOGIN), {
    method: "POST",
    headers: HEADERS,
    body: {
      email,
      password,
    },
  });

  // TODO: 400은 로그인 실패, 500은 서버문제 구분하기

  return response;
};
