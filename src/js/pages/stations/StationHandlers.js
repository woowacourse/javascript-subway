import Cookies from 'js-cookie';

import user from '../../models/user.js';

import router from '../../router.js';

import showSnackBar from '../../utils/snackbar.js';

import { PATH } from '../../constants/path.js';
import { COOKIE_KEY } from '../../constants/constants.js';
import { SNACKBAR_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages.js';

async function addStationHandler(target) {
  try {
    const stationName = target.elements['station-name'].value;
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
        showSnackBar(SNACKBAR_MESSAGE.ERROR.DUPLICATED_STATION_NAME);
        break;

      case 401:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.INVALID_USER);
        Cookies.remove(COOKIE_KEY.JWT_TOKEN);
        router.navigate(PATH.ROOT);
        break;

      default:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.FAIL_TO_ADD_STATION);
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
        showSnackBar(SNACKBAR_MESSAGE.ERROR.DUPLICATED_STATION_NAME);
        break;

      case 401:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.INVALID_USER);
        Cookies.remove(COOKIE_KEY.JWT_TOKEN);
        router.navigate(PATH.ROOT);
        break;

      default:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.FAIL_TO_MODIFY_STATION);
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
        showSnackBar(SNACKBAR_MESSAGE.ERROR.INCLUDED_STATION);
        break;

      case 401:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.INVALID_USER);
        Cookies.remove(COOKIE_KEY.JWT_TOKEN);
        router.navigate(PATH.ROOT);
        break;

      default:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.FAIL_TO_DELETE_STATION);
    }
  }
}

export { addStationHandler, saveModifyStationHandler, deleteStationHandler };
