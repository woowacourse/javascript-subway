import httpClient from '../api/httpClient';
import { ALERT_MESSAGE } from '../constants/service';

export const requestLineList = async () => {
  try {
    const response = await httpClient.get('/lines');
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: ALERT_MESSAGE.GET_LINE_LIST_FAILED,
    };
  }
};

export const requestAddLine = async name => {
  try {
    const response = await httpClient.post('/lines', { name });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: ALERT_MESSAGE.ADD_LINE_FAILED,
    };
  }
};

export const requestDeleteLine = async id => {
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

export const requestEditLine = async ({ id, name }) => {
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
