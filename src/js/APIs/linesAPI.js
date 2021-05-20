import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messages.js";
import getAccessToken from "./accessToken.js";
import request from "./subwayAPI";

const PATH = {
  LINES: (id = "") => `/lines/${id}`,
};

export const getLinesAPI = async (lineId = "") => {
  try {
    const response = await request.get({
      path: PATH.LINES(lineId),
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
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
      message: e.message,
    };
  }
};

export const addLineAPI = async (lineData) => {
  try {
    const response = await request.post({
      path: PATH.LINES(),
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: lineData,
    });

    if (response.status === 400) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.LINES.INVALID_LINE,
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
      message: e.message,
    };
  }
};

export const modifyLineAPI = async (lineData) => {
  try {
    const response = await request.put({
      path: PATH.LINES(lineData.id),
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: {
        name: lineData.name,
        color: lineData.color,
      },
    });

    if (response.status === 400) {
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
      message: e.message,
    };
  }
};

export const deleteLineAPI = async (lineId) => {
  try {
    const response = await request.delete({
      path: PATH.LINES(lineId),
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
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
      message: e.message,
    };
  }
};
