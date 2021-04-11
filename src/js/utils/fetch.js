import { ALERT_MESSAGE, ERROR_CODE } from '../constants.js';

const fetchSignup = async (url, bodyData) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  if (response.status === ERROR_CODE.BAD_REQUEST) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_EMAIL_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchLogin = async (url, bodyData) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  if (response.status === ERROR_CODE.BAD_REQUEST) {
    throw new Error(ALERT_MESSAGE.LOGIN_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchMyInfo = async (url, accessToken) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchStationCreation = async (url, { bodyData, accessToken }) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  if (response.status === ERROR_CODE.BAD_REQUEST) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_STATION_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchStationRead = async (url, accessToken) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchStationNameRevision = async (url, { bodyData, accessToken }) => {
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(bodyData),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  if (response.status === ERROR_CODE.BAD_REQUEST) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_STATION_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchStationRemoval = async (url, accessToken) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === ERROR_CODE.BAD_REQUEST) {
    throw new Error(ALERT_MESSAGE.STATION_REMOVAL_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchLineCreation = async (url, { bodyData, accessToken }) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  if (response.status === ERROR_CODE.BAD_REQUEST) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_LINE_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchLineRead = async (url, accessToken) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchLineRevision = async (url, { bodyData, accessToken }) => {
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(bodyData),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  if (response.status === ERROR_CODE.BAD_REQUEST) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_LINE_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchLineRemoval = async (url, accessToken) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchSectionCreation = async (url, { accessToken, bodyData }) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  if (response.status === ERROR_CODE.BAD_REQUEST) {
    throw new Error(ALERT_MESSAGE.DISTANCE_CONDITION_OF_SECTION_CREATION_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchSectionRemoval = async (url, accessToken) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === ERROR_CODE.BAD_REQUEST) {
    throw new Error(ALERT_MESSAGE.SECTION_REMOVAL_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

export {
  fetchSignup,
  fetchLogin,
  fetchMyInfo,
  fetchStationCreation,
  fetchStationRead,
  fetchStationNameRevision,
  fetchStationRemoval,
  fetchLineCreation,
  fetchLineRead,
  fetchLineRevision,
  fetchLineRemoval,
  fetchSectionCreation,
  fetchSectionRemoval,
};
