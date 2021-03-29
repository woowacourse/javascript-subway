import httpClient from '../api/httpClient';
import { LINE } from '../constants/alertMessage';

export const requestLineList = async () => {
  try {
    const response = await httpClient.get('/lines');

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
      message: error.message ?? LINE.GET_LINE_LIST_FAILED,
    };
  }
};

export const requestAddLine = async line => {
  try {
    const response = await httpClient.post('/lines', line);

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
      message: error.message ?? LINE.ADD_LINE_FAILED,
    };
  }
};

export const requestDeleteLine = async id => {
  try {
    const response = await httpClient.delete(`/lines/${id}`);

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
      message: error.message ?? LINE.DELETE_LINE_FAILED,
    };
  }
};

export const requestEditLine = async (id, body) => {
  try {
    const response = await httpClient.put(`/lines/${id}`, body);

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
      message: error.message ?? LINE.EDIT_LINE_FAILED,
    };
  }
};
