import { renderNonEditMode } from './view.js';
import { renderContent } from '../../index.js';
import { showNotification, reportError, DELETE, handleException } from '../../../utils/index.js';
import { LINES_MESSAGES, API_ENDPOINT, PATHNAMES } from '../../../constants/index.js';

export default async function requestRemoveLine($editForm) {
  const { lineId } = $editForm.dataset;

  try {
    const response = await DELETE(`${API_ENDPOINT.LINES}/${lineId}`);

    if (!response.ok) {
      await handleException(response);
      return;
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
