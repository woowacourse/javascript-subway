import { HOST } from './constants/constants.js';

const postRequest = async (url, data, token = '') => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const getRequest = async (url, token = '') => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const deleteRequest = async (url, token = '') => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const putRequest = async (url, data, token = '') => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

export const signupRequest = async (data) => {
  const url = `${HOST}/members`;
  const response = await postRequest(url, data);

  return response;
};

export const loginRequest = async (data) => {
  const url = `${HOST}/login/token`;
  const response = await postRequest(url, data);

  return response.json();
};

export const userInfoRequest = async (token) => {
  const url = `${HOST}/members/me`;
  const response = await getRequest(url, token);

  return response.json();
};

export const checkEmailDuplicatedRequest = async (email) => {
  const url = `${HOST}/members/check-validation?email=${email}`;
  const response = await getRequest(url);

  return response;
};

export const stationListRequest = async (token) => {
  const url = `${HOST}/stations`;
  const response = await getRequest(url, token);

  return response.json();
};

export const lineListRequest = async (token) => {
  const url = `${HOST}/lines`;
  const response = await getRequest(url, token);

  return response.json();
};

export const addStationRequest = async (data, token) => {
  const url = `${HOST}/stations`;
  const response = await postRequest(url, data, token);

  return response.json();
};

export const deleteStationRequest = async (id, token) => {
  const url = `${HOST}/stations/${id}`;
  const response = await deleteRequest(url, token);

  return response;
};

export const editStationRequest = async (id, name, token) => {
  const url = `${HOST}/stations/${id}`;
  const response = await putRequest(url, { name }, token);

  return response;
};

export const createLineRequest = async (data, token) => {
  const url = `${HOST}/lines`;
  const response = await postRequest(url, data, token);

  return response.json();
};

export const deleteLineRequest = async (id, token) => {
  const url = `${HOST}/lines/${id}`;
  const response = await deleteRequest(url, token);

  return response;
};
