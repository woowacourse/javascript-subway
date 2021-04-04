import request from "./subwayAPI";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messages.js";

const PATH = {
  SIGNUP: "/members",
  MEMBER_INFO: "/members/me",
  LOGIN: "/login/token",
  CHECK_DUPLICATED_EMAIL: "/members/check-validation",
};

const STATUS = {
  DUPLICATED_EMAIL: 422,
};

export const checkDuplicatedEmailAPI = async (email) => {
  try {
    const response = await request.get({
      path: PATH.CHECK_DUPLICATED_EMAIL,
      params: { email },
    });

    // 사용 가능한 이메일
    if (response.ok) {
      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.MEMBER.VALID_EMAIL,
      };
    }

    // 중복된 이메일
    if (response.status === STATUS.DUPLICATED_EMAIL) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.MEMBER.DUPLICATED_EMAIL,
      };
    }

    throw new Error(ERROR_MESSAGE.GENERAL.UNKNOWN_API_STATUS);
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
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
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
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
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
    };
  }
};

export const getMemberInfo = async (accessToken) => {
  try {
    const response = await request.get({
      path: PATH.MEMBER_INFO,
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
    };
  }
};
