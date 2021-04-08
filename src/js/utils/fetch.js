import {
  ALERT_MESSAGE,
  REQUEST_URL,
  HTTP_RESPONSE_STATUS,
  LOCAL_STORAGE_KEY,
} from '../constants.js';

const customFetch = async (
  url,
  { method, bodyData, accessToken, contentType, accept }
) => {
  const fetchOption = {
    headers: {},
  };

  if (method !== undefined) {
    fetchOption['method'] = method;
  }

  if (bodyData !== undefined) {
    fetchOption['body'] = JSON.stringify(bodyData);
  }

  if (accessToken !== undefined) {
    fetchOption.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  if (contentType !== undefined) {
    fetchOption.headers['Content-Type'] = contentType;
  }

  if (accept !== undefined) {
    fetchOption['Accept'] = accept;
  }

  return await fetch(url, fetchOption);
};

const fetchSignup = async bodyData => {
  const url = REQUEST_URL + '/members';

  const response = await customFetch(url, {
    method: 'POST',
    bodyData,
    contentType: 'application/json; charset=UTF-8',
  });

  if (response.status === HTTP_RESPONSE_STATUS.FOUR_ZERO_ZERO) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_EMAIL_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchLogin = async bodyData => {
  const url = REQUEST_URL + '/login/token';
  const response = await customFetch(url, {
    method: 'POST',
    bodyData,
    contentType: 'application/json; charset=UTF-8',
  });

  if (response.status === HTTP_RESPONSE_STATUS.FOUR_ZERO_ZERO) {
    throw new Error(ALERT_MESSAGE.LOGIN_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchMyInfo = async () => {
  const url = REQUEST_URL + '/members/me';
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  const response = await customFetch(url, {
    accessToken,
    accept: 'application/json',
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchStationCreation = async bodyData => {
  const url = REQUEST_URL + '/stations';
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  const response = await customFetch(url, {
    method: 'POST',
    bodyData,
    accessToken,
    contentType: 'application/json; charset=UTF-8',
  });

  if (response.status === HTTP_RESPONSE_STATUS.FOUR_ZERO_ZERO) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_STATION_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchStationRead = async accessToken => {
  const url = REQUEST_URL + '/stations';
  const response = await customFetch(url, {
    accessToken,
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchStationNameRevision = async ({
  accessToken,
  bodyData,
  stationId,
}) => {
  const url = REQUEST_URL + `/stations/${stationId}`;
  const response = await customFetch(url, {
    method: 'PUT',
    bodyData,
    accessToken,
    contentType: 'application/json; charset=UTF-8',
  });

  if (response.status === HTTP_RESPONSE_STATUS.FOUR_ZERO_ZERO) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_STATION_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchStationRemoval = async (stationId, accessToken) => {
  const url = REQUEST_URL + `/stations/${stationId}`;
  const response = await customFetch(url, {
    method: 'DELETE',
    accessToken,
  });

  if (response.status === HTTP_RESPONSE_STATUS.FOUR_ZERO_ZERO) {
    throw new Error(ALERT_MESSAGE.STATION_REMOVAL_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchLineCreation = async (bodyData, accessToken) => {
  const url = REQUEST_URL + '/lines';
  const response = await customFetch(url, {
    method: 'POST',
    bodyData,
    accessToken,
    contentType: 'application/json; charset=UTF-8',
  });

  if (response.status === HTTP_RESPONSE_STATUS.FOUR_ZERO_ZERO) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_LINE_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchLineRead = async (lineId, accessToken) => {
  const url = REQUEST_URL + `/lines/${lineId}`;
  const response = await customFetch(url, {
    accessToken,
    accept: 'application/json',
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchLineListRead = async accessToken => {
  const url = REQUEST_URL + '/lines';
  const response = await customFetch(url, {
    accessToken,
    accept: 'application/json',
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchLineRevision = async ({ accessToken, bodyData, lineId }) => {
  const url = REQUEST_URL + `/lines/${lineId}`;
  const response = await customFetch(url, {
    method: 'PUT',
    bodyData,
    accessToken,
    contentType: 'application/json; charset=UTF-8',
  });

  if (response.status === HTTP_RESPONSE_STATUS.FOUR_ZERO_ZERO) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_LINE_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchLineRemoval = async (lineId, accessToken) => {
  const url = REQUEST_URL + `/lines/${lineId}`;
  const response = await customFetch(url, {
    method: 'DELETE',
    accessToken,
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchSectionCreation = async ({ accessToken, bodyData, lineId }) => {
  const url = REQUEST_URL + `/lines/${lineId}/sections`;
  const response = await customFetch(url, {
    method: 'POST',
    bodyData,
    accessToken,
    contentType: 'application/json; charset=UTF-8',
  });

  if (response.status === HTTP_RESPONSE_STATUS.FOUR_ZERO_ZERO) {
    throw new Error(ALERT_MESSAGE.DISTANCE_CONDITION_OF_SECTION_CREATION_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchSectionRemoval = async ({ accessToken, stationId, lineId }) => {
  const url = REQUEST_URL + `/lines/${lineId}/sections?stationId=${stationId}`;
  const response = await customFetch(url, {
    method: 'DELETE',
    accessToken,
  });

  if (response.status === HTTP_RESPONSE_STATUS.FOUR_ZERO_ZERO) {
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
  fetchLineListRead,
  fetchLineRevision,
  fetchLineRemoval,
  fetchSectionCreation,
  fetchSectionRemoval,
};
