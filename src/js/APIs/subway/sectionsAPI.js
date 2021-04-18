import Request from "../Request.js";
import { END_POINT, PATH } from "./path.js";
import STATUS from "./status.js";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../constants/messages.js";

const request = new Request(END_POINT);

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
        message: SUCCESS_MESSAGE.ADD_SECTION,
      };
    }

    if (response.status === STATUS.SECTIONS.INVALID) {
      const message = await response.text();

      return {
        isSucceeded: false,
        message,
      };
    }

    throw new Error(ERROR_MESSAGE.UNKNOWN_API_STATUS);
  } catch (e) {
    console.log(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.API_CALL_FAILURE,
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
        message: SUCCESS_MESSAGE.DELETE_SECTION,
      };
    }

    if (response.status === STATUS.SECTIONS.INVALID) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.MIN_SECTION_LENGTH,
      };
    }

    throw new Error(ERROR_MESSAGE.UNKNOWN_API_STATUS);
  } catch (e) {
    console.log(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.API_CALL_FAILURE,
    };
  }
};
