import Request from "../Request.js";
import { END_POINT, PATH } from "./path.js";
import STATUS from "./status.js";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../constants/messages.js";

const request = new Request(END_POINT);

export const getLinesAPI = async (accessToken, lineId = "") => {
  try {
    const response = await request.get({
      path: PATH.LINES(lineId),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.FETCH_LINE_FAILURE);
    }

    const lines = await response.json();

    return {
      isSucceeded: true,
      lines,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.API_CALL_FAILURE,
    };
  }
};

export const addLineAPI = async (lineData, accessToken) => {
  try {
    const response = await request.post({
      path: PATH.LINES(),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: lineData,
    });

    if (response.ok) {
      const line = await response.json();

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.ADD_LINE,
        line,
      };
    }

    if (response.status === STATUS.LINES.DUPLICATED) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.DUPLICATED_LINE,
      };
    }

    throw Error(ERROR_MESSAGE.UNKNOWN_API_STATUS);
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.API_CALL_FAILURE,
    };
  }
};

export const modifyLineAPI = async (lineData, accessToken) => {
  try {
    const response = await request.put({
      path: PATH.LINES(lineData.id),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        name: lineData.name,
        color: lineData.color,
      },
    });

    if (response.ok) {
      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.MODIFY_LINE,
      };
    }

    if (response.status === STATUS.LINES.DUPLICATED) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.DUPLICATED_LINE,
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

export const deleteLineAPI = async (lineId, accessToken) => {
  try {
    const response = await request.delete({
      path: PATH.LINES(lineId),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.DELETE_LINE);
    }

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.DELETE_LINE,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.API_CALL_FAILURE,
    };
  }
};
