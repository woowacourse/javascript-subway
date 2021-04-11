import { renderNonEditMode } from './view.js';
import { renderContent } from '../../index.js';
import { showNotification, toStringFromFormData, reportError, PUT } from '../../../utils/index.js';
import { STATIONS_MESSAGES, API_ENDPOINT, AUTH_MESSAGES, PATHNAMES, STATUS_CODE } from '../../../constants/index.js';
import { logout } from '../../../auth/index.js';
import { goTo } from '../../../router/index.js';

export default async function requestUpdateStation({ target: $editForm, formData }) {
  const { stationId, stationName } = $editForm.dataset;
  const newStationName = formData.get('name');

  if (stationName === newStationName) {
    showNotification(STATIONS_MESSAGES.STATION_NAME_ALREADY_EXISTS);
    return;
  }

  try {
    const response = await PUT(`${API_ENDPOINT.STATIONS}/${stationId}`, {
      body: toStringFromFormData(formData),
    });

    if (response.status === STATUS_CODE.AUTH_FAILED) {
      showNotification(AUTH_MESSAGES.LOGIN_HAS_BEEN_EXPIRED);
      logout();
      goTo(PATHNAMES.LOGIN);
      return;
    }

    if (response.status === STATUS_CODE.STATIONS.UPDATE.DUPLICATED) {
      showNotification(STATIONS_MESSAGES.STATION_NAME_ALREADY_EXISTS);
      return;
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`[status code: ${response.status}] ${errorMessage}`);
    }

    renderContent(PATHNAMES.STATIONS);
    showNotification(STATIONS_MESSAGES.STATION_HAS_BEEN_UPDATED);
  } catch (error) {
    reportError({
      messageToUser: STATIONS_MESSAGES.REQUEST_HAS_BEEN_FAILED,
      messageToLog: error.message,
    });
    renderNonEditMode($editForm);
  }
}
