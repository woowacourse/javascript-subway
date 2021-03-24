import httpClient from '../api/httpClient';
import { LINE } from '../constants/alertMessage';

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
      message: LINE.GET_LINE_LIST_FAILED,
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
      message: LINE.ADD_LINE_FAILED,
    };
  }
};
