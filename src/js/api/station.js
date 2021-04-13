import httpClient from '../api/httpClient';
import { STATION } from '../constants/alertMessage';

export const requestStationList = async () => {
  try {
    const response = await httpClient.get('/stations');

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || STATION.GET_STATION_LIST_FAILED,
    };
  }
};

export const requestAddStation = async name => {
  try {
    const response = await httpClient.post('/stations', { name });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || STATION.ADD_STATION_FAILED,
    };
  }
};

export const requestDeleteStation = async id => {
  try {
    const response = await httpClient.delete(`/stations/${id}`);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.message || STATION.DELETE_STATION_FAILED,
    };
  }
};

export const requestEditStation = async ({ id, name }) => {
  try {
    const response = await httpClient.put(`/stations/${id}`, { name });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || STATION.EDIT_STATION_FAILED,
    };
  }
};
