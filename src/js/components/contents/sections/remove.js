import { renderContent } from '../../index.js';
import { showNotification, reportError } from '../../../utils/index.js';
import { SECTIONS_MESSAGES, API_ENDPOINT, AUTH_MESSAGES, PATHNAMES, STATUS_CODE } from '../../../constants/index.js';
import { getHeadersWithAccessToken, logout } from '../../../auth/index.js';
import { goTo } from '../../../router/index.js';

export default async function requestRemoveSection({ lineId, stationId }) {
  try {
    const response = await fetchRemoveSection({ lineId, stationId });

    if (response.status === STATUS_CODE.AUTH_FAILED) {
      showNotification(AUTH_MESSAGES.LOGIN_HAS_BEEN_EXPIRED);
      logout();
      goTo(PATHNAMES.LOGIN);
      return;
    }

    if (response.status === STATUS_CODE.SECTIONS.REMOVE.ONLY_ONE_SECTION) {
      showNotification(SECTIONS_MESSAGES.THERE_IS_NO_SECTION_TO_REMOVE);
      return;
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`[status code: ${response.status}] ${errorMessage}`);
    }

    renderContent(PATHNAMES.SECTIONS);
    showNotification(SECTIONS_MESSAGES.SECTION_HAS_BEEN_REMOVED);
  } catch (error) {
    reportError({
      messageToUser: SECTIONS_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
  }
}

async function fetchRemoveSection({ lineId, stationId }) {
  const url = new URL(`${API_ENDPOINT.LINES}/${lineId}/sections`);
  const parameters = new URLSearchParams({ stationId });

  url.search = parameters.toString();

  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeadersWithAccessToken(),
  });

  return response;
}
