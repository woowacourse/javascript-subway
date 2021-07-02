import Cookies from 'js-cookie';

import user from '../../models/user.js';

import router from '../../router.js';

import { $, changeBackgroundColor } from '../../utils/DOM.js';
import showSnackBar from '../../utils/snackbar.js';

import { COOKIE_KEY } from '../../constants/constants.js';
import { SNACKBAR_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages.js';
import { PATH } from '../../constants/path.js';

async function addLineHandler(e) {
  try {
    const newLineInfo = {
      name: e.target.elements['line-name'].value,
      upStationId: Number(e.target.elements['up-station'].value),
      downStationId: Number(e.target.elements['down-station'].value),
      distance: Number(e.target.elements.distance.value),
      color: e.target.elements['line-color'].value,
    };

    if (newLineInfo.upStationId === newLineInfo.downStationId) {
      showSnackBar(SNACKBAR_MESSAGE.ERROR.DUPLICATED_UP_DOWN_STATIONS);
      return;
    }

    const { newLine, response } = await user.lineManager.addLine(newLineInfo);

    if (!response.ok) {
      throw response;
    }

    return newLine;
  } catch (response) {
    switch (response.status) {
      case 401:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.INVALID_USER);
        Cookies.remove(COOKIE_KEY.JWT_TOKEN);
        router.navigate(PATH.ROOT);
        break;

      default:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.FAIL_TO_ADD_LINE);
    }
  }
}

async function modifyLineHandler(e, modifiedLineId) {
  try {
    const modifiedLineInfo = {
      name: e.target.elements['line-name'].value,
      color: e.target.elements['line-color'].value,
    };

    const response = await user.lineManager.modifyLine(
      modifiedLineId,
      modifiedLineInfo
    );

    if (!response.ok) {
      throw response;
    }

    return {
      id: modifiedLineId,
      name: modifiedLineInfo.name,
      color: modifiedLineInfo.color,
    };
  } catch (response) {
    switch (response.status) {
      case 401:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.INVALID_USER);
        Cookies.remove(COOKIE_KEY.JWT_TOKEN);
        router.navigate(PATH.ROOT);
        break;

      default:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.FAIL_TO_MODIFY_LINE);
    }
  }
}

async function deleteLineHandler(e) {
  if (!window.confirm(CONFIRM_MESSAGE.DELETE_LINE)) return;

  const { lineId } = e.target.closest('li').dataset;

  try {
    const response = await user.lineManager.deleteLine(lineId);
    if (!response.ok) {
      throw response;
    }

    return response.ok;
  } catch (response) {
    switch (response.status) {
      case 401:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.INVALID_USER);
        Cookies.remove(COOKIE_KEY.JWT_TOKEN);
        router.navigate(PATH.ROOT);
        break;

      default:
        showSnackBar(SNACKBAR_MESSAGE.ERROR.FAIL_TO_DELETE_LINE);
    }
  }
}

function selectColorHandler(e) {
  if (!e.target.classList.contains('color-option')) return;

  const currentColor = e.target.dataset.colorOption;

  $('#line-color').value = currentColor;
  changeBackgroundColor($('#selected-line-color'), currentColor);
}

export {
  deleteLineHandler,
  addLineHandler,
  modifyLineHandler,
  selectColorHandler,
};
