import Request from "../Request.js";
import { END_POINT, PATH } from "./path.js";
import STATUS from "./status.js";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../constants/messages.js";

const request = new Request(END_POINT);

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

    if (response.ok) {
      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.DELETE_STATION,
      };
    }

    if (response.status === STATUS.STATIONS.USED) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.USED_STATION,
      };
    }

    throw new Error(ERROR_MESSAGE.DELETE_STATION);
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: ERROR_MESSAGE.API_CALL_FAILURE,
    };
  }
};
