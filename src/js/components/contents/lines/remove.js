import { renderNonEditMode } from './view.js';
import { renderContent } from '../../index.js';
import { goTo } from '../../../router/index.js';
import { showNotification, reportError, DELETE } from '../../../utils/index.js';
import { logout } from '../../../auth/index.js';
import { LINES_MESSAGES, API_ENDPOINT, AUTH_MESSAGES, PATHNAMES, STATUS_CODE } from '../../../constants/index.js';

export default async function requestRemoveLine($editForm) {
  const { lineId } = $editForm.dataset;

  try {
    const response = await DELETE(`${API_ENDPOINT.LINES}/${lineId}`);

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

    renderContent(PATHNAMES.LINES);
    showNotification(LINES_MESSAGES.LINE_HAS_BEEN_REMOVED);
  } catch (error) {
    reportError({
      messageToUser: LINES_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
    renderNonEditMode($editForm);
  }
}
