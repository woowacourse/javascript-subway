import { API } from '../utils/API.js';
import { showSnackbar } from '../utils/index.js';
import { SNACKBAR_MESSAGE } from '../constants/index.js';

export const isValidToken = async (token) => {
  try {
    await API.getUserInfo(token);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getAccessToken = async ({ email, password }) => {
  try {
    const response = await API.login({ email, password });
    const responseJSON = await response.json();

    return responseJSON.accessToken || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const isSignupSuccess = async ({ email, password, name }) => {
  try {
    await API.signup({ email, password, name });

    return true;
  } catch (status) {
    console.error(status);
    return false;
  }
};

export const isDuplicatedEmail = async (email) => {
  try {
    await API.checkDuplicateEmail(email);

    return false;
  } catch (status) {
    console.error(status);
    return true;
  }
};

export const getStationList = async (token) => {
  try {
    const response = await API.getStationList(token);
    const responseJSON = await response.json();

    return responseJSON || null;
  } catch (status) {
    console.error(status);
    return null;
  }
};

export const getCreatedStationData = async ({ token, name }) => {
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
};

export const stationDeleted = async ({ token, id }) => {
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
};

export const isStationEdited = async ({ token, name, id }) => {
  try {
    await API.editStation({ token, name, id });
    return true;
  } catch (status) {
    return false;
  }
};

export const getLineList = async (token) => {
  try {
    const response = await API.getLineList(token);
    const responseJSON = await response.json();

    return responseJSON || null;
  } catch (status) {
    console.error(status);
    return null;
  }
};

export const getLineData = async ({ token, id }) => {
  try {
    const response = await API.getLine({ token, id });
    const responseJSON = await response.json();

    return responseJSON || null;
  } catch (status) {
    console.error(status);
    return null;
  }
};

export const getCreatedLineData = async ({ token, ...contents }) => {
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
};

export const lineDeleted = async ({ token, id }) => {
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
};

export const isLineEdited = async ({ token, id, ...contents }) => {
  try {
    await API.editLine({ token, id, contents });
    return true;
  } catch (status) {
    console.error(status);
    return false;
  }
};

export const getSectionData = async ({ token, id }) => {
  const lineData = await getLineData({ token, id });

  if (!lineData) {
    return null;
  }

  // return lineData.sections;
  return lineData.stations;
};

export const getCreatedSectionData = async ({ token, id, contents }) => {
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
};
