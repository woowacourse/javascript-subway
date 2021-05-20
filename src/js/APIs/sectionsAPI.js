import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messages.js";
import getAccessToken from "./accessToken.js";
import request from "./subwayAPI";

export const PATH = {
  SECTIONS: (id = "") => `/lines/${id}/sections`,
};

export const addSectionAPI = async (lineId, sectionData) => {
  try {
    const response = await request.post({
      path: PATH.SECTIONS(lineId),
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: sectionData,
    });

    if (response.status === 400) {
      const message = await response.text();

      return {
        isSucceeded: false,
        message,
      };
    }

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.GENERAL.UNKNOWN_API_STATUS);
    }

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.SECTIONS.ADD,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
    };
  }
};

export const deleteSectionAPI = async (lineId, stationId) => {
  try {
    const response = await request.delete({
      path: PATH.SECTIONS(lineId),
      params: {
        stationId,
      },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    if (response.status === 400) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.SECTIONS.MIN_SECTION_LENGTH,
      };
    }

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.GENERAL.UNKNOWN_API_STATUS);
    }

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.SECTIONS.DELETE,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.GENERAL.API_CALL_FAILURE,
    };
  }
};
