import { renderContent } from '../../index.js';
import { showNotification, reportError, DELETE, handleException } from '../../../utils/index.js';
import { SECTIONS_MESSAGES, API_ENDPOINT, PATHNAMES, STATUS_CODE } from '../../../constants/index.js';

export default async function requestRemoveSection({ lineId, stationId }) {
  try {
    const response = await DELETE(`${API_ENDPOINT.LINES}/${lineId}/sections?stationId=${stationId}`);

    if (!response.ok) {
      await handleException(response, {
        [STATUS_CODE.SECTIONS.REMOVE.ONLY_ONE_SECTION]: () =>
          showNotification(SECTIONS_MESSAGES.THERE_IS_NO_SECTION_TO_REMOVE),
      });
      return;
    }

    renderContent(PATHNAMES.SECTIONS);
    showNotification(SECTIONS_MESSAGES.SECTION_HAS_BEEN_REMOVED);
  } catch (error) {
    reportError({
      messageToUser: SECTIONS_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
  }
}
