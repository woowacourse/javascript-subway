import { renderNonEditMode } from './view.js';
import { renderContent } from '../../index.js';
import { showNotification, toStringFromFormData, reportError } from '../../../utils/index.js';
import { LINES_MESSAGES, API_ENDPOINT, AUTH_MESSAGES, PATHNAMES, STATUS_CODE } from '../../../constants/index.js';
import { getHeadersWithAccessToken, logout } from '../../../auth/index.js';
import { goTo } from '../../../router/index.js';

export default async function requestUpdateLine({ target: $editForm, formData }) {
  const { lineId, lineName } = $editForm.dataset;
  const newLineName = formData.get('name');

  if (lineName === newLineName) {
    showNotification(LINES_MESSAGES.LINE_NAME_ALREADY_EXISTS);
    return;
  }

  try {
    const response = await fetchUpdateLine({ lineId, formData });

    if (response.status === STATUS_CODE.AUTH_FAILED) {
      showNotification(AUTH_MESSAGES.LOGIN_HAS_BEEN_EXPIRED);
      logout();
      goTo(PATHNAMES.LOGIN);
      return;
    }

    if (response.status === STATUS_CODE.LINES.UPDATE.DUPLICATED) {
      showNotification(LINES_MESSAGES.LINE_NAME_ALREADY_EXISTS);
      return;
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`[status code: ${response.status}] ${errorMessage}`);
    }

    renderContent(PATHNAMES.LINES);
    showNotification(LINES_MESSAGES.LINE_HAS_BEEN_UPDATED);
  } catch (error) {
    reportError({
      messageToUser: LINES_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
    renderNonEditMode($editForm);
  }
}

async function fetchUpdateLine({ lineId, formData }) {
  const response = await fetch(`${API_ENDPOINT.LINES}/${lineId}`, {
    method: 'PUT',
    headers: getHeadersWithAccessToken(),
    body: toStringFromFormData(formData),
  });

  return response;
}
