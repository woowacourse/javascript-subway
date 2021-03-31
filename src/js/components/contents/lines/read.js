import { goTo } from '../../../router/index.js';
import { showNotification, reportError } from '../../../utils/index.js';
import { getHeadersWithAccessToken, logout } from '../../../auth/index.js';
import { API_ENDPOINT, STATUS_CODE, LINES_MESSAGES, AUTH_MESSAGES, PATHNAMES } from '../../../constants/index.js';

export default async function requestReadLine() {
  try {
    const response = await fetchReadLine();

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
      messageToUser: LINES_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
    return [];
  }
}

async function fetchReadLine() {
  const response = await fetch(API_ENDPOINT.LINES, {
    method: 'GET',
    headers: getHeadersWithAccessToken(),
  });

  return response;
}
