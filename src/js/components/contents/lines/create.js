import { renderContent } from '../../index.js';
import { toStringFromFormData, showNotification, reportError, POST, handleException } from '../../../utils/index.js';
import { API_ENDPOINT, STATUS_CODE, LINES_MESSAGES, PATHNAMES } from '../../../constants/index.js';

export async function requestCreateLine({ formData, target }) {
  try {
    const response = await POST(API_ENDPOINT.LINES, {
      body: toStringFromFormData(formData),
    });

    if (!response.ok) {
      await handleException(response, {
        [STATUS_CODE.LINES.CREATE.DUPLICATED]: () => showNotification(LINES_MESSAGES.LINE_NAME_ALREADY_EXISTS),
      });
      return;
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
