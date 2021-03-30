import { ALERT_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages.js';
import user from '../../models/user.js';
import { $ } from '../../utils/DOM.js';

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
      default:
        alert(ALERT_MESSAGE.ERROR.FAIL_TO_MODIFY_LINE);
    }
  }
}

async function deleteLineHandler(e) {
  if (!window.confirm(CONFIRM_MESSAGE.DELETE_LINE)) return;

  const { lineId } = e.target.closest('li').dataset;
  const resFlag = await user.lineManager.deleteLine(lineId);
  if (!resFlag) {
    alert(ALERT_MESSAGE.ERROR.FAIL_TO_DELETE_LINE);
  }

  return resFlag;
}

function selectColorHandler(e) {
  if (!e.target.classList.contains('color-option')) return;

  $('#line-color').value = e.target.dataset.colorOption;
}

export {
  deleteLineHandler,
  addLineHandler,
  modifyLineHandler,
  selectColorHandler,
};