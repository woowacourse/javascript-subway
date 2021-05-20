import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messages.js";
import getAccessToken from "./accessToken.js";
import request from "./subwayAPI";

const PATH = {
  SIGNUP: "/members",
  MEMBER_INFO: "/members/me",
  LOGIN: "/login/token",
  CHECK_DUPLICATED_EMAIL: "/members/check-validation",
};

export const checkDuplicatedEmailAPI = async (email) => {
  try {
    const response = await request.get({
      path: PATH.CHECK_DUPLICATED_EMAIL,
      params: { email },
    });

    if (response.status === 422) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.MEMBER.DUPLICATED_EMAIL,
      };
    }

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.GENERAL.UNKNOWN_API_STATUS);
    }

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.MEMBER.VALID_EMAIL,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: e.message,
    };
  }
};

export const signupAPI = async (memberInfo) => {
  try {
    const response = await request.post({
      path: PATH.SIGNUP,
      body: memberInfo,
    });

    if (!response.ok) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.MEMBER.SIGNUP,
      };
    }

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.SIGNUP_SUCCESS,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: e.message,
    };
  }
};

export const loginAPI = async (loginInfo) => {
  try {
    const response = await request.post({
      path: PATH.LOGIN,
      body: loginInfo,
    });

    if (!response.ok) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.MEMBER.LOGIN,
      };
    }

    const result = await response.json();

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.MEMBER.LOGIN,
      accessToken: result.accessToken,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: e.message,
    };
  }
};

export const getMemberInfo = async () => {
  try {
    const response = await request.get({
      path: PATH.MEMBER_INFO,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        isSucceeded: false,
      };
    }

    const memberInfo = await response.json();

    return {
      isSucceeded: true,
      memberInfo,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: e.message,
    };
  }
};
