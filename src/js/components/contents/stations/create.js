import { renderContent } from '../../index.js';
import { toStringFromFormData, showNotification, reportError, POST, handleException } from '../../../utils/index.js';
import { API_ENDPOINT, STATIONS_MESSAGES, PATHNAMES } from '../../../constants/index.js';

export async function requestCreateStation({ formData, target }) {
  try {
    const response = await POST(API_ENDPOINT.STATIONS, { body: toStringFromFormData(formData) });

    if (!response.ok) {
      await handleException(response);
      return;
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
