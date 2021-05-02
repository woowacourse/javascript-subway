import { API } from '../utils/API.js';
import { getLocalStorageItem, showSnackbar } from '../utils/index.js';
import { LOCAL_STORAGE_KEY, SNACKBAR_MESSAGE } from '../constants/index.js';

const getToken = () => {
  return getLocalStorageItem({ key: LOCAL_STORAGE_KEY.TOKEN });
};

export const service = {
  isValidToken: async () => {
    const token = await getToken();

    try {
      await API.getUserInfo(token);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  getAccessToken: async ({ email, password }) => {
    try {
      const response = await API.login({ email, password });
      const responseJSON = await response.json();

      return responseJSON.accessToken || null;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  signup: async ({ email, password, name }) => {
    try {
      await API.signup({ email, password, name });

      return true;
    } catch (status) {
      console.error(status);
      return false;
    }
  },

  isDuplicatedEmail: async (email) => {
    try {
      await API.checkDuplicateEmail(email);

      return false;
    } catch (status) {
      console.error(status);
      return true;
    }
  },

  getStationList: async () => {
    const token = await getToken();

    try {
      const response = await API.getStationList(token);
      const responseJSON = await response.json();

      return responseJSON || null;
    } catch (status) {
      console.error(status);
      return null;
    }
  },

  getCreatedStationData: async ({ name }) => {
    const token = await getToken();

    try {
      const response = await API.createStation({
        token,
        name,
      });
      const responseJSON = await response.json();

      return responseJSON;
    } catch (status) {
      console.error(status);
      return null;
    }
  },

  deleteStation: async ({ id }) => {
    const token = await getToken();

    try {
      await API.deleteStation({
        token,
        id,
      });

      return true;
    } catch (status) {
      if (status === 400) {
        showSnackbar(SNACKBAR_MESSAGE.IS_NOT_POSSIBLE_DELETE);
      }

      return false;
    }
  },

  editStation: async ({ name, id }) => {
    const token = await getToken();

    try {
      await API.editStation({ token, name, id });
      return true;
    } catch (status) {
      return false;
    }
  },

  getLineList: async () => {
    const token = await getToken();

    try {
      const response = await API.getLineList(token);
      const responseJSON = await response.json();

      return responseJSON || null;
    } catch (status) {
      console.error(status);
      return null;
    }
  },

  getLineData: async ({ id }) => {
    const token = await getToken();

    try {
      const response = await API.getLine({ token, id });
      const responseJSON = await response.json();

      return responseJSON || null;
    } catch (status) {
      console.error(status);
      return null;
    }
  },

  getCreatedLineData: async ({ ...contents }) => {
    const token = await getToken();

    try {
      const response = await API.createLine({
        token,
        contents,
      });
      const responseJSON = await response.json();

      return responseJSON;
    } catch (status) {
      console.error(status);
      return null;
    }
  },

  deleteLine: async ({ id }) => {
    const token = await getToken();

    try {
      await API.deleteLine({
        token,
        id,
      });

      return true;
    } catch (status) {
      console.error(status);
      return false;
    }
  },

  editLine: async ({ id, ...contents }) => {
    const token = await getToken();

    try {
      await API.editLine({ token, id, contents });
      return true;
    } catch (status) {
      console.error(status);
      return false;
    }
  },

  getCreatedSectionData: async ({ id, contents }) => {
    const token = await getToken();

    try {
      const response = await API.createSection({
        token,
        id,
        contents,
      });

      return response;
    } catch (status) {
      console.error(status);
      return null;
    }
  },

  deleteSection: async ({ lineId, stationId }) => {
    const token = await getToken();

    try {
      await API.deleteSection({
        token,
        lineId,
        stationId,
      });

      return true;
    } catch (status) {
      console.error(status);
      return false;
    }
  },
};
