import user from '../../models/user';
import { $ } from '../../utils/DOM.js';

async function addStationHandler(e) {
  try {
    const stationName = e.target.elements['station-name'].value;

    return await user.stationManager.addStation(stationName);
  } catch (error) {
    alert('지하철 역 추가에 실패하였습니다.');
    console.error('fail fetch');
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
    alert('역 수정에 실패했습니다.');
  }

  return resFlag;
}

async function deleteStationHandler(targetStationId) {
  if (!window.confirm('역을 삭제하시겠습니까?')) return;

  const resFlag = await user.stationManager.deleteStation(targetStationId);
  if (!resFlag) {
    alert('역 삭제에 실패했습니다.');
  }

  return resFlag;
}
export { addStationHandler, saveModifyStationHandler, deleteStationHandler };
