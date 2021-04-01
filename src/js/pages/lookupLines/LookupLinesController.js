import { $, changeBackgroundColor } from '../../utils/DOM.js';
import LookupLinesView from './LookupLinesView.js';
import user from '../../models/user.js';
import { COOKIE_KEY } from '../../constants/constants.js';
import { PATH } from '../../constants/path.js';
import router from '../../router.js';
import jwtToken from '../../jwtToken.js';
import { ALERT_MESSAGE } from '../../constants/messages.js';

class LookupLinesController {
  constructor() {
    this.lookupLinesView = new LookupLinesView();
  }

  async init() {
    const allLines = await this.getAllLines();

    if (!allLines) {
      jwtToken.deleteToken(COOKIE_KEY.JWT_TOKEN);
      router.navigate(PATH.ROOT);
      return;
    }

    await this.lookupLinesView.init(allLines);
    this.bindEvents();
  }

  async getAllLines() {
    try {
      const { allLines, response } = await user.lineManager.getAllLines();

      if (!response.ok) {
        throw response;
      }

      return allLines;
    } catch (response) {
      switch (response.status) {
        case 401:
          alert(ALERT_MESSAGE.ERROR.INVALID_USER);
          break;
        default:
      }
    }
  }

  onLineSelect({ target }) {
    const targetLineId = target.value;
    const targetLineColor =
      target.options[target.selectedIndex].dataset.lineColor;

    changeBackgroundColor($('#line-name'), targetLineColor);

    const stations = user.lineManager.getAllStationsInLine(targetLineId);
    const sections = user.lineManager.getAllSections(targetLineId);
    this.lookupLinesView.renderSections(
      stations,
      sections,
      targetLineColor.substring(3)
    );
  }

  bindEvents() {
    $('#lookup-lines-form').addEventListener(
      'change',
      this.onLineSelect.bind(this)
    );
  }
}

export default LookupLinesController;
