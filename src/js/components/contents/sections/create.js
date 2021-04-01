import { renderContent } from '../../index.js';
import { goTo } from '../../../router/index.js';
import { getHeadersWithAccessToken, logout } from '../../../auth/index.js';
import { toStringFromFormData, showNotification, reportError } from '../../../utils/index.js';
import { API_ENDPOINT, STATUS_CODE, SECTIONS_MESSAGES, AUTH_MESSAGES, PATHNAMES } from '../../../constants/index.js';
import { renderNonEditMode } from './view.js';

const UP_STATION_ID = 'upStationId';
const DOWN_STATION_ID = 'downStationId';

export async function requestCreateSection({ target, formData }) {
  try {
    const { upStationId, downStationId, lineId } = target.dataset;

    formData.set(UP_STATION_ID, upStationId);
    formData.set(DOWN_STATION_ID, downStationId);

    const response = await fetchCreateSection(formData, lineId);

    if (response.status === STATUS_CODE.AUTH_FAILED) {
      showNotification(AUTH_MESSAGES.LOGIN_HAS_BEEN_EXPIRED);
      logout();
      goTo(PATHNAMES.LOGIN);
      return;
    }

    if (response.status === STATUS_CODE.SECTIONS.CREATE.INVALID_FORM_DATA) {
      showNotification(SECTIONS_MESSAGES.SECTION_NEEDS_TO_BE_SHORTER);
      return;
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`[status code: ${response.status}] ${errorMessage}`);
    }

    renderContent(PATHNAMES.SECTIONS);
    showNotification(SECTIONS_MESSAGES.SECTION_HAS_BEEN_ADDED);
    renderNonEditMode();
  } catch (error) {
    reportError({
      messageToUser: SECTIONS_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
  }
}

async function fetchCreateSection(formData, lineId) {
  const url = new URL(`${API_ENDPOINT.LINES}/${lineId}/sections`);
  const response = await fetch(url, {
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
