import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messages.js";

const PATH = {
  SIGNUP: "/members",
  MEMBER_INFO: "/members/me",
  LOGIN: "/login/token",
  CHECK_DUPLICATED_EMAIL: "/members/check-validation",
  STATIONS: (id = "") => `/stations/${id}`,
  LINES: (id = "") => `/lines/${id}`,
};

const STATUS = {
  EMAIL: {
    VALID: 200,
    DUPLICATED: 422,
  },
  STATIONS: {
    VALID: 201,
    DUPLICATED: 400,
  },
  LINES: {
    DUPLICATED: 400,
  },
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

  async get({ path, params = {}, headers = {} }) {
    const response =
      Object.keys(headers).length === 0
        ? await fetch(this.createURL(path, params))
        : await fetch(this.createURL(path, params), {
            headers: {
              ...this.headers,
              ...headers,
            },
          });

    return response;
  },

  async post({ path, headers = {}, body }) {
    const response = await fetch(this.createURL(path), {
      method: "POST",
      headers: {
        ...this.headers,
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return response;
  },

  async put({ path, headers = {}, body }) {
    const response = await fetch(this.createURL(path), {
      method: "PUT",
      headers: {
        ...this.headers,
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return response;
  },

  async delete({ path, headers = {} }) {
    const response = await fetch(this.createURL(path), {
      method: "DELETE",
      headers: {
        ...this.headers,
        ...headers,
      },
    });

    return response;
  },
};

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
      message: ERROR_MESSAGE.API_CALL_FAILURE,
    };
  }
};

export const getStationsAPI = async (accessToken) => {
  try {
    const response = await request.get({
      path: PATH.STATIONS(),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.FETCH_STATION_FAILURE);
    }

    const stations = await response.json();

    return {
      isSucceeded: true,
      stations,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.API_CALL_FAILURE,
    };
  }
};

export const addStationAPI = async (stationName, accessToken) => {
  try {
    const response = await request.post({
      path: PATH.STATIONS(),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        name: stationName,
      },
    });

    if (response.status === STATUS.STATIONS.VALID) {
      const station = await response.json();

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.ADD_STATION,
        station,
      };
    }

    if (response.status === STATUS.STATIONS.DUPLICATED) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.DUPLICATED_STATION,
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

export const modifyStationNameAPI = async (
  stationId,
  newStationName,
  accessToken
) => {
  try {
    const response = await request.put({
      path: PATH.STATIONS(stationId),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        name: newStationName,
      },
    });

    if (response.ok) {
      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.MODIFY_STATION,
      };
    }

    if (response.status === STATUS.STATIONS.DUPLICATED) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.DUPLICATED_STATION,
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

export const deleteStationAPI = async (stationId, accessToken) => {
  try {
    const response = await request.delete({
      path: PATH.STATIONS(stationId),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.DELETE_STATION);
    }

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.DELETE_STATION,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.API_CALL_FAILURE,
    };
  }
};

export const getLinesAPI = async (accessToken) => {
  try {
    const response = await request.get({
      path: PATH.LINES(),
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
