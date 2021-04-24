import { ALERT_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages.js';
import { $ } from '../../utils/DOM.js';
import user from '../../models/user.js';
import router from '../../router.js';
import { PATH } from '../../constants/path.js';
import jwtToken from '../../jwtToken.js';
import { COOKIE_KEY } from '../../constants/constants.js';

async function addSectionHandler({ target }) {
  const newSectionInfo = {
    upStationId: Number(target.elements['up-station'].value),
    downStationId: Number(target.elements['down-station'].value),
    distance: Number(target.elements.distance.value),
    duration: Number(target.elements.duration.value),
  };
  try {
    const response = await user.lineManager.addSection(
      newSectionInfo,
      target.elements['line-for-section'].value
    );
    if (!response.ok) {
      throw response;
    }

    return response.ok;
  } catch (response) {
    switch (response.status) {
      case 401:
        alert(ALERT_MESSAGE.ERROR.INVALID_USER);
        jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)
          ? router.navigate(PATH.ROOT)
          : router.navigate(PATH.LOGIN);
        break;
      default:
        alert(ALERT_MESSAGE.ERROR.FAIL_TO_ADD_SECTION);
    }
  }
}

async function deleteSectionHandler(e) {
  if (!window.confirm(CONFIRM_MESSAGE.DELETE_SECTION)) return;

  const lineId = $('#line-name').value;
  const { sectionId } = e.target.closest('li').dataset;
  try {
    const response = await user.lineManager.deleteSection(lineId, sectionId);
    if (!response.ok) {
      throw response;
    }

    return response.ok;
  } catch (response) {
    switch (response.status) {
      case 401:
        alert(ALERT_MESSAGE.ERROR.INVALID_USER);
        jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)
          ? router.navigate(PATH.ROOT)
          : router.navigate(PATH.LOGIN);
        break;
      default:
        alert(ALERT_MESSAGE.ERROR.FAIL_TO_DELETE_SECTION);
    }
  }
}

export { addSectionHandler, deleteSectionHandler };
