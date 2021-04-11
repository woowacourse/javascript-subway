import UserDataManager from '../model/UserDataManager';
import { $ } from '../utils/dom';
import { getLineListMapTemplate } from '../templates/map';
import { ELEMENT } from '../utils/constants';

class Map {
  constructor() {
    this.userDataManager = new UserDataManager();
  }

  init() {
    this.renderMap();
  }

  renderMap() {
    const lineData = this.userDataManager.lines;
    const renderTarget = $(`.${ELEMENT.SUBWAY_MAP}`);
    const template = lineData.map((line) => getLineListMapTemplate(line)).join('');

    renderTarget.innerHTML = template;
  }
}

export default Map;
