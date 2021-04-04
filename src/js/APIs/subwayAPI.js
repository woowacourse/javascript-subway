import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messages.js";

const PATH = {
  SIGNUP: "/members",
  MEMBER_INFO: "/members/me",
  LOGIN: "/login/token",
  CHECK_DUPLICATED_EMAIL: "/members/check-validation",
  STATIONS: (id = "") => `/stations/${id}`,
  LINES: (id = "") => `/lines/${id}`,
  SECTIONS: (id = "") => `/lines/${id}/sections`,
};

const STATUS = {
  EMAIL: {
    DUPLICATED: 422,
  },
  STATIONS: {
    DUPLICATED: 400,
  },
  LINES: {
    DUPLICATED: 400,
  },
  SECTIONS: {
    INVALID: 400,
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

  async delete({ path, params = {}, headers = {} }) {
    const response = await fetch(this.createURL(path, params), {
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
    if (response.ok {
      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.MEMBER.VALID_EMAIL,
      };
    }

    // 중복된 이메일
    if (response.status === STATUS.EMAIL.DUPLICATED) {
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

export const getStationsAPI = async (accessToken) => {
  try {
    const response = await request.get({
      path: PATH.STATIONS(),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.STATIONS.FETCH_STATION);
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
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
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

    if (response.ok) {
      const station = await response.json();

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.STATIONS.ADD,
        station,
      };
    }

    if (response.status === STATUS.STATIONS.DUPLICATED) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.STATIONS.DUPLICATED_STATION,
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
        message: SUCCESS_MESSAGE.STATIONS.MODIFY,
      };
    }

    if (response.status === STATUS.STATIONS.DUPLICATED) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.STATIONS.DUPLICATED_STATION,
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

export const deleteStationAPI = async (stationId, accessToken) => {
  try {
    const response = await request.delete({
      path: PATH.STATIONS(stationId),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.STATIONS.DELETE_STATION);
    }

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.STATIONS.DELETE,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
    };
  }
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

    if (response.ok) {
      const line = await response.json();

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.LINES.ADD,
        line,
      };
    }

    if (response.status === STATUS.LINES.DUPLICATED) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.LINES.DUPLICATED_LINE,
      };
    }

    throw Error(ERROR_MESSAGE.GENERAL.UNKNOWN_API_STATUS);
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

    if (response.ok) {
      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.LINES.MODIFY,
      };
    }

    if (response.status === STATUS.LINES.DUPLICATED) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.LINES.DUPLICATED_LINE,
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

export const addSectionAPI = async (lineId, sectionData, accessToken) => {
  try {
    const response = await request.post({
      path: PATH.SECTIONS(lineId),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: sectionData,
    });

    if (response.ok) {
      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.SECTIONS.ADD,
      };
    }

    if (response.status === STATUS.SECTIONS.INVALID) {
      const message = await response.text();

      return {
        isSucceeded: false,
        message,
      };
    }

    throw new Error(ERROR_MESSAGE.GENERAL.UNKNOWN_API_STATUS);
  } catch (e) {
    console.log(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
    };
  }
};

export const deleteSectionAPI = async (lineId, stationId, accessToken) => {
  try {
    const response = await request.delete({
      path: PATH.SECTIONS(lineId),
      params: {
        stationId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.SECTIONS.DELETE,
      };
    }

    if (response.status === STATUS.SECTIONS.INVALID) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.SECTIONS.MIN_SECTION_LENGTH,
      };
    }

    throw new Error(ERROR_MESSAGE.GENERAL.UNKNOWN_API_STATUS);
  } catch (e) {
    console.log(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
    };
  }
};
