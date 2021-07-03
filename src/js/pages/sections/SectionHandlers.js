import Cookies from 'js-cookie';

import user from '../../models/user.js';

import router from '../../router.js';

import { $ } from '../../utils/DOM.js';
import showSnackBar from '../../utils/snackbar.js';

import { SNACKBAR_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages.js';
import { PATH } from '../../constants/path.js';
import { COOKIE_KEY } from '../../constants/constants.js';

async function addSectionHandler(e) {
  const newSectionInfo = {
    upStationId: Number(e.target.elements['up-station'].value),
    downStationId: Number(e.target.elements['down-station'].value),
    distance: Number(e.target.elements.distance.value),
  };

  try {
    const response = await user.sectionManager.addSection(
      newSectionInfo,
      e.target.elements['line-for-section'].value
    );

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
        showSnackBar(SNACKBAR_MESSAGE.ERROR.FAIL_TO_ADD_SECTION);
    }
  }
}

async function deleteSectionHandler(e) {
  if (!window.confirm(CONFIRM_MESSAGE.DELETE_SECTION)) return;

  const lineId = $('#line-name').value;
  const { sectionId } = e.target.closest('li').dataset;

  try {
    const response = await user.sectionManager.deleteSection(lineId, sectionId);

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
        showSnackBar(SNACKBAR_MESSAGE.ERROR.FAIL_TO_DELETE_SECTION);
    }
  }
}

export { addSectionHandler, deleteSectionHandler };
