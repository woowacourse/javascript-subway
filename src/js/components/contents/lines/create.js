import { renderContent } from '../../index.js';
import { goTo } from '../../../router/index.js';
import { logout } from '../../../auth/index.js';
import { toStringFromFormData, showNotification, reportError, POST } from '../../../utils/index.js';
import { API_ENDPOINT, STATUS_CODE, LINES_MESSAGES, AUTH_MESSAGES, PATHNAMES } from '../../../constants/index.js';

export async function requestCreateLine({ formData, target }) {
  try {
    const response = await POST(API_ENDPOINT.LINES, {
      body: toStringFromFormData(formData),
    });

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
      const errorMessage = await response.text();
      throw new Error(`[status code: ${response.status}] ${errorMessage}`);
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

export function updateSubmitButtonState({ currentTarget }) {
  const $button = currentTarget.submit;

  $button.disabled = !currentTarget.checkValidity();
}
