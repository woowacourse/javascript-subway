import httpClient from '../api/httpClient';
import { ALERT_MESSAGE } from '../constants';

export const requestStationList = async () => {
  try {
    const response = await httpClient.get('/stations');
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: ALERT_MESSAGE.GET_STATION_LIST_FAILED,
    };
  }
};

export const requestAddStation = async name => {
  try {
    const response = await httpClient.post('/stations', { name });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: ALERT_MESSAGE.ADD_STATION_FAILED,
    };
  }
};

export const requestDeleteStation = async id => {
  try {
    const response = await httpClient.delete(`/stations/${id}`);

    if (!response.ok) throw new Error();

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: ALERT_MESSAGE.DELETE_STATION_FAILED,
    };
  }
};

export const requestEditStation = async ({ id, name }) => {
  try {
    const response = await httpClient.put(`/stations/${id}`, { name });
    if (!response.ok) throw new Error();

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: ALERT_MESSAGE.EDIT_STATION_FAILED,
    };
  }
};
