import {
  ERROR_MESSAGE,
  INVALID_MESSAGE,
  SUCCESS_MESSAGE,
} from '../constants/message.js';
import ValidationError from '../error/ValidationError.js';
import request from '../utils/request.js';

const api = {
  create: async (params, snackbar, updateSubwayState) => {
    try {
      const response = await request.post(params);

      if (!response.ok) throw Error(await response.text());
      await updateSubwayState();

      snackbar.show(SUCCESS_MESSAGE.CREATE);
    } catch (error) {
      snackbar.show(error.message);
      console.error(error.message);
    }
  },

  delete: async (params, snackbar, updateSubwayState) => {
    try {
      const response = await request.delete(params);

      if (!response.ok) throw Error(await response.text());
      await updateSubwayState();

      snackbar.show(SUCCESS_MESSAGE.DELETE);
    } catch (error) {
      snackbar.show(error.message);
      console.error(error.message);
    }
  },

  update: async (params, snackbar, updateSubwayState) => {
    try {
      const response = await request.put(params);

      if (!response.ok) throw Error(await response.text());
      await updateSubwayState();
      snackbar.show(SUCCESS_MESSAGE.UPDATE);
    } catch (error) {
      snackbar.show(error.message);
      console.error(error.message);
    }
  },

  isValidAccessToken: async (params) => {
    try {
      const response = await request.get(params);

      if (!response.ok) throw Error(ERROR_MESSAGE.INVALID_TOKEN);
    } catch (error) {
      console.error(error);

      return false;
    }

    return true;
  },

  login: async (params) => {
    const response = await request.post(params);

    if (response.status === 400) {
      throw new ValidationError(INVALID_MESSAGE.LOGIN.FAILED);
    }

    if (!response.ok) throw Error(response.message);

    const { accessToken } = await response.json();
    return accessToken;
  },

  signup: async (params) => {
    const response = await request.post(params);
    if (!response.ok) throw Error(response.message);
  },
};

export default api;
