import {
  ALERT_MESSAGE,
  REQUEST_URL,
  HTTP_RESPONSE_STATUS,
} from '../constants.js';

const fetchSignup = async bodyData => {
  const url = REQUEST_URL + '/members';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
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
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  if (response.status === HTTP_RESPONSE_STATUS.FOUR_ZERO_ZERO) {
    throw new Error(ALERT_MESSAGE.LOGIN_FAIL);
  }

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

const fetchMyInfo = async accessToken => {
  const url = REQUEST_URL + '/members/me';
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

const fetchStationCreation = async (bodyData, accessToken) => {
  const url = REQUEST_URL + '/stations';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
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

const fetchStationNameRevision = async ({
  accessToken,
  bodyData,
  stationId,
}) => {
  const url = REQUEST_URL + `/stations/${stationId}`;
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(bodyData),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
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
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
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

const fetchLineListRead = async accessToken => {
  const url = REQUEST_URL + '/lines';
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

const fetchLineRevision = async ({ accessToken, bodyData, lineId }) => {
  const url = REQUEST_URL + `/lines/${lineId}`;
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(bodyData),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
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

const fetchSectionCreation = async (accessToken, bodyData) => {
  const url = REQUEST_URL + `/lines/${modalLineId}/sections`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
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
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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
