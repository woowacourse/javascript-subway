import { API } from '../utils/API.js';
import { showSnackbar } from '../utils/index.js';
import { SNACKBAR_MESSAGE } from '../constants/index.js';

export const serviceAPI = {
  isValidToken: async (token) => {
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

  getStationList: async (token) => {
    try {
      const response = await API.getStationList(token);
      const responseJSON = await response.json();

      return responseJSON || null;
    } catch (status) {
      console.error(status);
      return null;
    }
  },

  getCreatedStationData: async ({ token, name }) => {
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

  deleteStation: async ({ token, id }) => {
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

  editStation: async ({ token, name, id }) => {
    try {
      await API.editStation({ token, name, id });
      return true;
    } catch (status) {
      return false;
    }
  },

  getLineList: async (token) => {
    try {
      const response = await API.getLineList(token);
      const responseJSON = await response.json();

      return responseJSON || null;
    } catch (status) {
      console.error(status);
      return null;
    }
  },

  getLineData: async ({ token, id }) => {
    try {
      const response = await API.getLine({ token, id });
      const responseJSON = await response.json();

      return responseJSON || null;
    } catch (status) {
      console.error(status);
      return null;
    }
  },

  getCreatedLineData: async ({ token, ...contents }) => {
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

  deleteLine: async ({ token, id }) => {
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

  editLine: async ({ token, id, ...contents }) => {
    try {
      await API.editLine({ token, id, contents });
      return true;
    } catch (status) {
      console.error(status);
      return false;
    }
  },

  getSectionData: async ({ token, id }) => {
    const lineData = await serviceAPI.getLineData({ token, id });

    if (!lineData) {
      return null;
    }

    return lineData.stations;
  },

  getCreatedSectionData: async ({ token, id, contents }) => {
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

  deleteSection: async ({ token, lineId, stationId }) => {
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
