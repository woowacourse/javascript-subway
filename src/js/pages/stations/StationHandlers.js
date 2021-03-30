import user from '../../models/user.js';
import { ALERT_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages.js';

async function addStationHandler(e) {
  try {
    const stationName = e.target.elements['station-name'].value;

    return await user.stationManager.addStation(stationName);
  } catch (error) {
    alert(ALERT_MESSAGE.ERROR.FAIL_TO_ADD_STATION);
  }
}

async function saveModifyStationHandler(stationId, newStationName) {
  const currentStationName = user.stationManager.getStation(stationId).name;
  if (currentStationName === newStationName) return true;

  try {
    const response = await user.stationManager.modifyStation(
      Number(stationId),
      newStationName
    );

    if (!response.ok) {
      throw response;
    }

    return response.ok;
  } catch (response) {
    switch (response.status) {
      case 400:
        alert(ALERT_MESSAGE.ERROR.DUPLICATED_STATION_NAME);
        break;
      default:
        alert(ALERT_MESSAGE.ERROR.FAIL_TO_MODIFY_STATION);
    }
  }
}

async function deleteStationHandler(targetStationId) {
  if (!window.confirm(CONFIRM_MESSAGE.DELETE_STATION)) return;
  try {
    const response = await user.stationManager.deleteStation(targetStationId);
    if (!response.ok) {
      throw response;
    }

    return response.ok;
  } catch (response) {
    switch (response.status) {
      case 400:
        alert(ALERT_MESSAGE.ERROR.INCLUDED_STATION);
        break;
      default:
        alert(ALERT_MESSAGE.ERROR.FAIL_TO_DELETE_STATION);
    }
  }
}

export { addStationHandler, saveModifyStationHandler, deleteStationHandler };