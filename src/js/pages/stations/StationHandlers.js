import user from '../../models/user.js';
import { ALERT_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages.js';
import router from '../../router.js';
import { PATH } from '../../constants/path.js';
import jwtToken from '../../jwtToken.js';
import { COOKIE_KEY } from '../../constants/constants.js';

async function addStationHandler(e) {
  try {
    const stationName = e.target.elements['station-name'].value;
    const { newStation, response } = await user.stationManager.addStation(
      stationName
    );

    if (!response.ok) {
      throw response;
    }

    return newStation;
  } catch (response) {
    switch (response.status) {
      case 400:
        alert(ALERT_MESSAGE.ERROR.DUPLICATED_STATION_NAME);
        break;
      case 401:
        alert(ALERT_MESSAGE.ERROR.INVALID_USER);
        jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)
          ? router.navigate(PATH.ROOT)
          : router.navigate(PATH.LOGIN);
        break;
      default:
        alert(ALERT_MESSAGE.ERROR.FAIL_TO_ADD_STATION);
    }
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
      case 401:
        alert(ALERT_MESSAGE.ERROR.INVALID_USER);
        jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)
          ? router.navigate(PATH.ROOT)
          : router.navigate(PATH.LOGIN);
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
      case 401:
        alert(ALERT_MESSAGE.ERROR.INVALID_USER);
        jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)
          ? router.navigate(PATH.ROOT)
          : router.navigate(PATH.LOGIN);
        break;
      default:
        alert(ALERT_MESSAGE.ERROR.FAIL_TO_DELETE_STATION);
    }
  }
}

export { addStationHandler, saveModifyStationHandler, deleteStationHandler };
