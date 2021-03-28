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

  const resFlag = await user.stationManager.modifyStation(
    Number(stationId),
    newStationName
  );

  if (!resFlag) {
    alert(ALERT_MESSAGE.ERROR.FAIL_TO_MODIFY_STATION);
  }

  return resFlag;
}

async function deleteStationHandler(targetStationId) {
  if (!window.confirm(CONFIRM_MESSAGE.DELETE_STATION)) return;

  const resFlag = await user.stationManager.deleteStation(targetStationId);
  if (!resFlag) {
    alert(ALERT_MESSAGE.ERROR.FAIL_TO_DELETE_STATION);
  }

  return resFlag;
}
export { addStationHandler, saveModifyStationHandler, deleteStationHandler };
