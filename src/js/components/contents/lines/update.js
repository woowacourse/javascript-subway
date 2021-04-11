import { renderNonEditMode } from './view.js';
import { renderContent } from '../../index.js';
import { showNotification, toStringFromFormData, reportError, PUT, handleException } from '../../../utils/index.js';
import { LINES_MESSAGES, API_ENDPOINT, PATHNAMES, STATUS_CODE } from '../../../constants/index.js';

export default async function requestUpdateLine({ target: $editForm, formData }) {
  const { lineId, lineName } = $editForm.dataset;
  const newLineName = formData.get('name');

  if (lineName === newLineName) {
    showNotification(LINES_MESSAGES.LINE_NAME_ALREADY_EXISTS);
    return;
  }

  try {
    const response = await PUT(`${API_ENDPOINT.LINES}/${lineId}`, {
      body: toStringFromFormData(formData),
    });

    if (!response.ok) {
      await handleException(response, {
        [STATUS_CODE.LINES.UPDATE.DUPLICATED]: () => showNotification(LINES_MESSAGES.LINE_NAME_ALREADY_EXISTS),
      });
      return;
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
