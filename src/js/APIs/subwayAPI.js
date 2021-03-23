import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messages.js";

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
  try {
    const response = await request.get(PATH.CHECK_DUPLICATED_EMAIL, { email });

    // 사용 가능한 이메일
    if (response.status === 200) {
      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.VALID_EMAIL,
      };
    }

    // 중복된 이메일
    if (response.status === 422) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.DUPLICATED_EMAIL,
      };
    }

    throw new Error(ERROR_MESSAGE.UNKNOWN_API_STATUS);
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.API_CALL_FAILURE,
    };
  }
};

export const signupAPI = async (memberInfo) => {
  try {
    const response = await request.post(PATH.MEMBERS, memberInfo);

    if (response.ok) {
      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.SIGNUP_SUCCESS,
      };
    }

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.SIGNUP_FAILURE,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.API_CALL_FAILURE,
    };
  }
};

export const loginAPI = async (loginInfo) => {
  try {
    const response = await request.post(PATH.LOGIN, loginInfo);

    if (response.ok) {
      const result = await response.json();

      return {
        isSucceeded: false,
        message: SUCCESS_MESSAGE.LOGIN_SUCCESS,
        accessToken: result.accessToken,
      };
    }

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.LOGIN_FAILURE,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.API_CALL_FAILURE,
    };
  }
};
