import { renderContent } from '../../index.js';
import { toStringFromFormData, showNotification, reportError, POST } from '../../../utils/index.js';
import { logout } from '../../../auth/index.js';
import { goTo } from '../../../router/index.js';
import { API_ENDPOINT, STATUS_CODE, STATIONS_MESSAGES, AUTH_MESSAGES, PATHNAMES } from '../../../constants/index.js';

export async function requestCreateStation({ formData, target }) {
  try {
    const response = await POST(API_ENDPOINT.STATIONS, { body: toStringFromFormData(formData) });

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
      const errorMessage = await response.text();
      throw new Error(`[status code: ${response.status}] ${errorMessage}`);
    }

    renderContent(PATHNAMES.STATIONS);
    showNotification(STATIONS_MESSAGES.STATION_HAS_BEEN_ADDED);
    target.reset();
  } catch (error) {
    reportError({
      messageToUser: STATIONS_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
  }
}

export function updateSubmitButtonState({ currentTarget }) {
  const $button = currentTarget.submit;

  $button.disabled = !currentTarget.checkValidity();
}
