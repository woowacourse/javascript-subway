import { renderContent } from '../../index.js';
import { goTo } from '../../../router/index.js';
import { getHeadersWithAccessToken, logout } from '../../../auth/index.js';
import { toStringFromFormData, showNotification, reportError } from '../../../utils/index.js';
import { API_ENDPOINT, STATUS_CODE, LINES_MESSAGES, AUTH_MESSAGES, PATHNAMES } from '../../../constants/index.js';

export async function requestCreateLine({ formData, target }) {
  try {
    const response = await fetchCreateLine(formData);

    if (response.status === STATUS_CODE.AUTH_FAILED) {
      showNotification(AUTH_MESSAGES.LOGIN_HAS_BEEN_EXPIRED);
      logout();
      goTo(PATHNAMES.LOGIN);
      return;
    }

    if (response.status === STATUS_CODE.LINES.CREATE.DUPLICATED) {
      showNotification(LINES_MESSAGES.LINE_NAME_ALREADY_EXISTS);
      return;
    }

    if (!response.ok) {
      const body = await response.json();
      throw new Error(`[status code: ${response.status}] ${body}`);
    }

    renderContent(PATHNAMES.LINES);
    showNotification(LINES_MESSAGES.LINE_HAS_BEEN_ADDED);
    target.reset();
  } catch (error) {
    reportError({
      messageToUser: LINES_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
  }
}

async function fetchCreateLine(formData) {
  const response = await fetch(API_ENDPOINT.LINES, {
    method: 'POST',
    headers: getHeadersWithAccessToken(),
    body: toStringFromFormData(formData),
  });

  return response;
}

export function updateSubmitButtonState({ currentTarget }) {
  const $button = currentTarget.submit;

  $button.disabled = !currentTarget.checkValidity();
}
