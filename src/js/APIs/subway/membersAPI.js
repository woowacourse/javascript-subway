import Request from "../Request.js";
import { END_POINT, PATH } from "./path.js";
import STATUS from "./status.js";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../constants/messages.js";

const request = new Request(END_POINT);

export const checkDuplicatedEmailAPI = async (email) => {
  try {
    const response = await request.get({
      path: PATH.CHECK_DUPLICATED_EMAIL,
      params: { email },
    });

    // 사용 가능한 이메일
    if (response.status === STATUS.EMAIL.VALID) {
      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.VALID_EMAIL,
      };
    }

    // 중복된 이메일
    if (response.status === STATUS.EMAIL.DUPLICATED) {
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
    const response = await request.post({
      path: PATH.SIGNUP,
      body: memberInfo,
    });

    if (!response.ok) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.SIGNUP_FAILURE,
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
      message: ERROR_MESSAGE.API_CALL_FAILURE,
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
        message: ERROR_MESSAGE.LOGIN_FAILURE,
      };
    }

    const result = await response.json();

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.LOGIN_SUCCESS,
      accessToken: result.accessToken,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.API_CALL_FAILURE,
    };
  }
};

export const getMemberInfoAPI = async (accessToken) => {
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
      message: ERROR_MESSAGE.API_CALL_FAILURE,
    };
  }
};
