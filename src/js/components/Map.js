import { $, $$ } from '../utils/dom';
import { getMapLineTemplate } from '../templates/map';
import UserDataManager from '../model/UserDataManager';

class Map {
  constructor() {
    this.userDataManager = new UserDataManager();
  }

  init() {
    this.selectDom();
    this.renderMapList();
  }

  selectDom() {
    this.$mapWrapper = $('.map-wrapper');
  }

  renderMapList() {
    this.$mapWrapper.innerHTML = getMapLineTemplate(this.userDataManager.lines);
    $$('.station-list').forEach(this.setStationListStyle);
  }

  setStationListStyle($stationList) {
    if ($stationList.nextElementSibling.classList.contains('map-line-name')) return;

    const suitableWidth = $stationList.querySelector('.section-info').offsetWidth + 20;
    $stationList.style.marginRight = `${suitableWidth}px`;
    $stationList.querySelector('.section-line').style.width = `${suitableWidth + $stationList.offsetWidth}px`;
  }
}

export default Map;
