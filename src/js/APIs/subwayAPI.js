const PATH = {
  MEMBERS: "/members",
  LOGIN: "/login/token",
  CHECK_DUPLICATED_EMAIL: "/members/check-validation",
};

const request = {
  endPoint: "https://www.boorownie.com",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },

  createURL(path, params = {}) {
    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    return `${this.endPoint}${path}${queryString && `?${queryString}`}`;
  },

  async get(path, params = {}) {
    const response = await fetch(this.createURL(path, params));

    return response;
  },

  async post(path, body) {
    const response = await fetch(this.createURL(path), {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    return response;
  },
};

export const checkDuplicatedEmailAPI = async (email) => {
  const response = await request.get(PATH.CHECK_DUPLICATED_EMAIL, { email });

  return response;
};

export const signupAPI = async (memberInfo) => {
  const response = await request.post(PATH.MEMBERS, memberInfo);

  return response;
};

export const loginAPI = async (loginInfo) => {
  const response = await request.post(PATH.LOGIN, loginInfo);

  return response;
};
