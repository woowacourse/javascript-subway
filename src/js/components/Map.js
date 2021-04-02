import { $, $$ } from '../utils/dom';
import { getFindingRouteMapTemplate, getFindingRouteOptionsTemplate, getMapLineTemplate } from '../templates/map';
import UserDataManager from '../model/UserDataManager';
import { requestGetLineList, requestGetSubwayRouteList } from '../requestData/requestUserData';
import { openModal } from '../utils/modal';
import { ELEMENT } from '../utils/constants';

class Map {
  constructor() {
    this.userDataManager = new UserDataManager();
  }

  async init() {
    this.selectDom();
    this.bindEvent();
    !this.userDataManager.lineListTemplate && (await this.setLineListTemplate());
    this.renderMapList();
  }

  selectDom() {
    this.$mapWrapper = $('.map-wrapper');
    this.$mapNavBar = $('.map-nav-bar');
    this.$modal = $('.modal');
    this.$modalFindingRouteOptionWrapper = $('.modal__finding-route-option-wrapper');
    this.$modalFindingRouteForm = $('.modal__finding-route-form');
  }

  bindEvent() {
    this.$mapNavBar.addEventListener('click', (e) => {
      if (e.target.classList.contains('finding-route')) {
        this.handleFindingRouteButton();
      }
    });

    this.$modalFindingRouteForm.addEventListener('submit', this.handleFindingRouteForm.bind(this));
  }

  async setLineListTemplate() {
    try {
      const lineData = await requestGetLineList();

      this.userDataManager.setLineData(lineData);
      this.userDataManager.cacheLineListTemplate();
    } catch (error) {
      alert(error.message);
    }
  }

  renderMapList() {
    this.$mapWrapper.innerHTML = getMapLineTemplate(this.userDataManager.lines);
    this.setStationListStyle();
  }

  setStationListStyle() {
    $$('.station-list').forEach(($stationList) => {
      if ($stationList.nextElementSibling.classList.contains('map-line-name')) return;

      const suitableWidth = $stationList.querySelector('.map-station-name').offsetWidth + 20;
      $stationList.style.marginRight = `${suitableWidth}px`;
      $stationList.querySelector('.section-line').style.width = `${suitableWidth + $stationList.offsetWidth}px`;
    });
  }

  handleFindingRouteButton() {
    this.$modalFindingRouteOptionWrapper.innerHTML = getFindingRouteOptionsTemplate(this.userDataManager.stations);
    openModal(this.$modal);
  }

  async handleFindingRouteForm(e) {
    e.preventDefault();

    const upStationId = this.userDataManager.getTargetStationId(e.target[ELEMENT.UP_STATION].value);
    const downStationId = this.userDataManager.getTargetStationId(e.target[ELEMENT.DOWN_STATION].value);
    const standard = e.target['finding-standard'].value;

    try {
      const subwayRouteList = await requestGetSubwayRouteList({ upStationId, downStationId, standard });
      this.renderFindingRouteTemplate(subwayRouteList);
    } catch (error) {
      alert(error.message);
    }
  }

  renderFindingRouteTemplate(subwayRouteList) {
    const stationNameList = subwayRouteList.stations.map((station) => station.name);
    const lineColorList = this.userDataManager.getLineColorListForFindingRoute(stationNameList);

    this.$mapWrapper.innerHTML = getFindingRouteMapTemplate({
      stationNameList,
      lineColorList,
      distance: subwayRouteList.distance,
      duration: subwayRouteList.duration,
    });
    this.setStationListStyle();
  }
}

export default Map;
