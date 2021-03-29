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

  const response = await user.stationManager.deleteStation(targetStationId);
  if (!response.ok) {
    // TODO: 토큰 만료 후에는 어떻게 처리할지
    if (response.status === 400) {
      alert(ALERT_MESSAGE.ERROR.INCLUDED_STATION);
    } else {
      alert(ALERT_MESSAGE.ERROR.FAIL_TO_DELETE_STATION);
    }
  }

  return response.ok;
}
export { addStationHandler, saveModifyStationHandler, deleteStationHandler };
