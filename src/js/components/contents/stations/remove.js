import { renderNonEditMode } from './view.js';
import { renderContent } from '../../index.js';
import { showNotification, reportError, DELETE, handleException } from '../../../utils/index.js';
import { STATIONS_MESSAGES, API_ENDPOINT, PATHNAMES, STATUS_CODE } from '../../../constants/index.js';

export default async function requestRemoveStation($editForm) {
  const { stationId } = $editForm.dataset;

  try {
    const response = await DELETE(`${API_ENDPOINT.STATIONS}/${stationId}`);

    if (!response.ok) {
      await handleException(response, {
        [STATUS_CODE.STATIONS.REMOVE.REGISTERED_TO_LINE]: () =>
          showNotification(STATIONS_MESSAGES.STATION_IS_REGISTERED_TO_LINE),
      });
      return;
    }

    renderContent(PATHNAMES.STATIONS);
    showNotification(STATIONS_MESSAGES.STATION_HAS_BEEN_REMOVED);
  } catch (error) {
    reportError({
      messageToUser: STATIONS_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
    renderNonEditMode($editForm);
  }
}
