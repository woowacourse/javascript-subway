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

    return await user.lineManager.addLine(newLineInfo);
  } catch (error) {
    alert(ALERT_MESSAGE.ERROR.FAIL_TO_ADD_LINE);
  }
}

async function modifyLineHandler(e, modifiedLineId) {
  try {
    const modifiedLineInfo = {
      name: e.target.elements['line-name'].value,
      color: e.target.elements['line-color'].value,
      upStationId: Number(e.target.elements['up-station'].value),
      downStationId: Number(e.target.elements['down-station'].value),
      distance: Number(e.target.elements.distance.value),
      duration: Number(e.target.elements.duration.value),
    };

    const resFlag = await user.lineManager.modifyLine(
      modifiedLineId,
      modifiedLineInfo
    );

    if (!resFlag) {
      alert(ALERT_MESSAGE.ERROR.FAIL_TO_MODIFY_LINE);
      return;
    }

    return {
      id: modifiedLineId,
      name: modifiedLineInfo.name,
      color: modifiedLineInfo.color,
    };
  } catch (error) {
    // TODO : 에러 처리 고려
    console.error('fail fetch');
  }
}

async function deleteLineHandler(e) {
  if (!window.confirm(CONFIRM_MESSAGE.DELETE_LINE)) return;

  const targetLineId = e.target.closest('li').dataset.lineId;
  const resFlag = await user.lineManager.deleteLine(targetLineId);
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
