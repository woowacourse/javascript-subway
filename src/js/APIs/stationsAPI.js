import request from "./subwayAPI";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messages.js";
import getAccessToken from "./accessToken.js";

const PATH = {
  STATIONS: (id = "") => `/stations/${id}`,
};

export const getStationsAPI = async () => {
  try {
    const response = await request.get({
      path: PATH.STATIONS(),
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
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
      message: e.message,
    };
  }
};

export const addStationAPI = async (stationName) => {
  try {
    const response = await request.post({
      path: PATH.STATIONS(),
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: {
        name: stationName,
      },
    });

    if (response.status === 400) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.STATIONS.INVALID_STATION,
      };
    }

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.GENERAL.UNKNOWN_API_STATUS);
    }

    const station = await response.json();

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.STATIONS.ADD,
      station,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: e.message,
    };
  }
};

export const modifyStationNameAPI = async (stationId, newStationName) => {
  try {
    const response = await request.put({
      path: PATH.STATIONS(stationId),
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: {
        name: newStationName,
      },
    });

    if (response.status === 403) {
      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.STATIONS.DUPLICATED_STATION,
      };
    }

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.GENERAL.UNKNOWN_API_STATUS);
    }

    return {
      isSucceeded: true,
      message: SUCCESS_MESSAGE.STATIONS.MODIFY,
    };
  } catch (e) {
    console.error(e);

    return {
      isSucceeded: false,
      message: e.message,
    };
  }
};

export const deleteStationAPI = async (stationId) => {
  try {
    const response = await request.delete({
      path: PATH.STATIONS(stationId),
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
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
      message: e.message,
    };
  }
};
