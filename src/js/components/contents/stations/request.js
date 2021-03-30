import { renderContent } from '../../index.js';
import { toStringFromFormData, showNotification, reportError } from '../../../utils/index.js';
import { getAccessToken, logout } from '../../../auth/index.js';
import { goTo } from '../../../router/index.js';
import { API_ENDPOINT, STATUS_CODE, STATIONS_MESSAGES, AUTH_MESSAGES, PATHNAMES } from '../../../constants/index.js';

const getHeaders = () => ({
  'Content-Type': 'application/json; charset=UTF-8',
  Authorization: `Bearer ${getAccessToken()}`,
});

export async function requestReadStation() {
  try {
    const response = await fetchReadStation();

    if (response.status === STATUS_CODE.AUTH_FAILED) {
      showNotification(AUTH_MESSAGES.LOGIN_HAS_BEEN_EXPIRED);
      logout();
      goTo(PATHNAMES.LOGIN);
      return [];
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`[status code: ${response.status}] ${errorMessage}`);
    }

    const body = await response.json();
    return body;
  } catch (error) {
    reportError({
      messageToUser: STATIONS_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
    return [];
  }
}

export async function requestCreateStation({ formData }) {
  try {
    const response = await fetchCreateStation(formData);

    if (response.status === STATUS_CODE.AUTH_FAILED) {
      showNotification(AUTH_MESSAGES.LOGIN_HAS_BEEN_EXPIRED);
      logout();
      goTo(PATHNAMES.LOGIN);
      return;
    }

    if (response.status === STATUS_CODE.STATIONS.CREATE.DUPLICATED) {
      showNotification(STATIONS_MESSAGES.STATION_NAME_ALREADY_EXISTS);
      return;
    }

    if (!response.ok) {
      const body = await response.json();
      throw new Error(`[status code: ${response.status}] ${body}`);
    }

    renderContent(PATHNAMES.STATIONS);
    showNotification(STATIONS_MESSAGES.STATION_HAS_BEEN_ADDED);
  } catch (error) {
    reportError({
      messageToUser: STATIONS_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
  }
}

async function fetchCreateStation(formData) {
  const response = await fetch(API_ENDPOINT.STATIONS, {
    method: 'POST',
    headers: getHeaders(),
    body: toStringFromFormData(formData),
  });

  return response;
}

async function fetchReadStation() {
  const response = await fetch(API_ENDPOINT.STATIONS, {
    method: 'GET',
    headers: getHeaders(),
  });

  return response;
}