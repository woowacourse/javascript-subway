import { $, changeBackgroundColor } from '../../utils/DOM.js';
import LookupLinesView from './LookupLinesView.js';
import user from '../../models/user.js';

class LookupLinesController {
  constructor() {
    this.lookupLinesView = new LookupLinesView();
  }

  async init() {
    await this.lookupLinesView.init();
    this.bindEvents();
  }

  onLineSelect({ target }) {
    const targetLineId = target.value;
    const targetLineColor =
      target.options[target.selectedIndex].dataset.lineColor;

    changeBackgroundColor($('#line-name'), targetLineColor);
    console.log(targetLineColor);
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
