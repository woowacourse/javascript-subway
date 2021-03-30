import { ALERT_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages.js';
import { $ } from '../../utils/DOM.js';
import user from '../../models/user.js';

async function addSectionHandler(e) {
  const newSectionInfo = {
    upStationId: Number(e.target.elements['up-station'].value),
    downStationId: Number(e.target.elements['down-station'].value),
    distance: Number(e.target.elements.distance.value),
    duration: Number(e.target.elements.duration.value),
  };

  const resFlag = await user.lineManager.addSection(
    newSectionInfo,
    e.target.elements['line-for-section'].value
  );
  if (!resFlag) {
    alert(ALERT_MESSAGE.ERROR.FAIL_TO_ADD_SECTION);
  }

  return resFlag;
}

async function deleteSectionHandler(e) {
  if (!window.confirm(CONFIRM_MESSAGE.DELETE_SECTION)) return;

  const lineId = $('#line-name').value;
  const { sectionId } = e.target.closest('li').dataset;

  const resFlag = user.lineManager.deleteSection(lineId, sectionId);
  if (!resFlag) {
    alert(ALERT_MESSAGE.ERROR.FAIL_TO_DELETE_SECTION);
  }

  return resFlag;
}

export { addSectionHandler, deleteSectionHandler };
