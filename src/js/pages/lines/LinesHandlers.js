import { ALERT_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages.js';
import { PATH } from '../../constants/path.js';
import user from '../../models/user.js';
import router from '../../router.js';
import { $, changeBackgroundColor } from '../../utils/DOM.js';

async function addLineHandler(e) {
  try {
    const newLineInfo = {
      name: e.target.elements['line-name'].value,
      color: e.target.elements['line-color'].value,
      upStationId: Number(e.target.elements['up-station'].value),
      downStationId: Number(e.target.elements['down-station'].value),
      distance: Number(e.target.elements.distance.value),
      duration: Number(e.target.elements.duration.value),
    };

    if (newLineInfo.upStationId === newLineInfo.downStationId) {
      alert(ALERT_MESSAGE.ERROR.DUPLICATED_UP_DOWN_STATIONS);
      return;
    }

    const { newLine, response } = await user.lineManager.addLine(newLineInfo);

    if (!response.ok) {
      throw response;
    }

    return newLine;
  } catch (response) {
    switch (response.status) {
      case 400:
        alert(ALERT_MESSAGE.ERROR.DUPLICATED_LINE_NAME);
        break;
      case 401:
        alert(ALERT_MESSAGE.ERROR.INVALID_USER);
        router.navigate(PATH.ROOT);
        break;
      default:
        alert(ALERT_MESSAGE.ERROR.FAIL_TO_ADD_LINE);
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
      case 400:
        alert(ALERT_MESSAGE.ERROR.DUPLICATED_LINE_NAME);
        break;
      case 401:
        alert(ALERT_MESSAGE.ERROR.INVALID_USER);
        router.navigate(PATH.ROOT);
        break;
      default:
        alert(ALERT_MESSAGE.ERROR.FAIL_TO_MODIFY_LINE);
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
        alert(ALERT_MESSAGE.ERROR.INVALID_USER);
        router.navigate(PATH.ROOT);
        break;
      default:
        alert(ALERT_MESSAGE.ERROR.FAIL_TO_DELETE_LINE);
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
