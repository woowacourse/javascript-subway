import user from '../../models/user';
import { $ } from '../../utils/DOM.js';

async function addLineHandler(e) {
  try {
    const newLineInfo = {
      name: e.target.elements['line-name'].value,
      color: e.target.elements['line-color'].value,
      upStationId: Number(e.target.elements['up-station'].value),
      downStationId: Number(e.target.elements['down-station'].value),
      distance: Number(e.target.elements['distance'].value),
      duration: Number(e.target.elements['duration'].value),
    };

    return await user.lineManager.addLine(newLineInfo);
  } catch (error) {
    console.error('fail fetch');
  }
}

async function deleteLineHandler(e) {
  const targetLineId = e.target.closest('li').dataset.lineId;
  const resFlag = await user.lineManager.deleteLine(targetLineId);
  if (!resFlag) {
    alert('노선 삭제에 실패했습니다.');
    return;
  }
}

async function modifyLineHandler(e, modifiedLineId) {
  try {
    const modifiedLineInfo = {
      name: e.target.elements['line-name'].value,
      color: e.target.elements['line-color'].value,
      upStationId: Number(e.target.elements['up-station'].value),
      downStationId: Number(e.target.elements['down-station'].value),
      distance: Number(e.target.elements['distance'].value),
      duration: Number(e.target.elements['duration'].value),
    };

    const resFlag = await user.lineManager.modifyLine(
      modifiedLineId,
      modifiedLineInfo
    );

    if (!resFlag) {
      alert('노선 수정에 실패했습니다.');
      return;
    }

    return {
      id: modifiedLineId,
      name: modifiedLineInfo.name,
      color: modifiedLineInfo.color,
    };
  } catch (error) {
    console.error('fail fetch');
  }
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
