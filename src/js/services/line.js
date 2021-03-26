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

export const requestAddLine = async line => {
  try {
    const response = await httpClient.post('/lines', line);
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

export const requestDeleteLine = async id => {
  try {
    const response = await httpClient.delete(`/lines/${id}`);

    if (!response.ok) throw new Error();

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: LINE.DELETE_LINE_FAILED,
    };
  }
};

export const requestEditLine = async (id, body) => {
  try {
    const response = await httpClient.put(`/lines/${id}`, body);

    if (!response.ok) throw new Error();

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: LINE.EDIT_LINE_FAILED,
    };
  }
};
