import { SUCCESS_MESSAGE } from '../constants/message';
import request from '../utils/request';

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
};

export default api;
