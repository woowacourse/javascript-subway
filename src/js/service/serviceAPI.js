import { API } from '../utils/API.js';

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
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const isDuplicatedEmail = async (email) => {
  try {
    await API.checkDuplicateEmail(email);

    return false;
  } catch (err) {
    console.error(err);
    return true;
  }
};

export const getStationList = async (token) => {
  try {
    const response = await API.getStationList(token);
    const responseJSON = await response.json();

    return responseJSON || null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getCreatedStationData = async ({ token, name }) => {
  try {
    const response = await API.createStation({
      token: token,
      name: name,
    });
    const responseJSON = await response.json();

    return responseJSON;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const isDeleteSuccess = async ({ token, id }) => {
  try {
    await API.deleteStation({
      token,
      id,
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const isEditStationSuccess = async ({ token, name, id }) => {
  try {
    await API.editStation({ token, name, id });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
