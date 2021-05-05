import request from "./subwayAPI";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messages.js";

const PATH = {
  LINES: (id = "") => `/lines/${id}`,
};

const STATUS = {
  DUPLICATED_LINE: 400,
};

export const getLinesAPI = async (accessToken, lineId = "") => {
  try {
    const response = await request.get({
      path: PATH.LINES(lineId),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.LINES.FETCH_LINE);
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
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
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

    if (response.status === STATUS.DUPLICATED_LINE) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.LINES.DUPLICATED_LINE,
      };
    }

    if (!response.ok) {
      throw Error(ERROR_MESSAGE.GENERAL.UNKNOWN_API_STATUS);
    }

    const line = await response.json();

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.LINES.ADD,
      line,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
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

    if (response.status === STATUS.LINES.DUPLICATED) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.LINES.DUPLICATED_LINE,
      };
    }

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.GENERAL.UNKNOWN_API_STATUS);
    }

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.LINES.MODIFY,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
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
      throw new Error(ERROR_MESSAGE.LINES.DELETE_LINE);
    }

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.LINES.DELETE,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
    };
  }
};
