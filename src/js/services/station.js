import httpClient from '../api/httpClient';
import { ALERT_MESSAGE } from '../constants';

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
