import { ALERT_MESSAGE } from '../../constants/messages.js';
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

export { addSectionHandler };
