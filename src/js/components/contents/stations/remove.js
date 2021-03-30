import { renderNonEditMode } from './view.js';
import { renderContent } from '../../index.js';
import { showNotification, reportError } from '../../../utils/index.js';
import { STATIONS_MESSAGES, API_ENDPOINT, AUTH_MESSAGES, PATHNAMES, STATUS_CODE } from '../../../constants/index.js';
import { getHeadersWithAccessToken, logout } from '../../../auth/index.js';
import { goTo } from '../../../router/index.js';

export default async function requestRemoveStation($editForm) {
  const { stationId } = $editForm.dataset;

  try {
    const response = await fetchRemoveStation(stationId);

    if (response.status === STATUS_CODE.AUTH_FAILED) {
      showNotification(AUTH_MESSAGES.LOGIN_HAS_BEEN_EXPIRED);
      logout();
      goTo(PATHNAMES.LOGIN);
      return;
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`[status code: ${response.status}] ${errorMessage}`);
    }

    renderContent(PATHNAMES.STATIONS);
    showNotification(STATIONS_MESSAGES.STATION_HAS_BEEN_REMOVED);
  } catch (error) {
    reportError({
      messageToUser: STATIONS_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
    renderNonEditMode($editForm);
  }
}

async function fetchRemoveStation(stationId) {
  const response = await fetch(`${API_ENDPOINT.STATIONS}/${stationId}`, {
    method: 'DELETE',
    headers: getHeadersWithAccessToken(),
  });

  return response;
}
