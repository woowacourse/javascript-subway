const END_POINT = "https://www.boorownie.com";
const HEADERS = {
  "Content-Type": "application/json; charset=UTF-8",
};
const PATH = {
  MEMBERS: "/members",
  LOGIN: "/login/token",
  CHECK_DUPLICATED_EMAIL: "/members/check-validation",
};

const getURL = (path, params = {}) => {
  const queryString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return `${END_POINT}${path}${queryString === "" ? "" : `?${queryString}`}`;
};

export const checkDuplicatedEmailAPI = async (email) => {
  const response = await fetch(getURL(PATH.CHECK_DUPLICATED_EMAIL, { email }));

  return response;
};

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
