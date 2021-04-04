import request from "./subwayAPI";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messages.js";

export const PATH = {
  SECTIONS: (id = "") => `/lines/${id}/sections`,
};

export const STATUS = {
  INVALID_SECTION: 400,
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

    if (response.status === STATUS.INVALID_SECTION) {
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
