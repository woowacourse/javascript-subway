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

  return response;
};

export const loginAPI = async ({ email, password }) => {
  const response = await fetch(getURL(PATH.LOGIN), {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response;
};
