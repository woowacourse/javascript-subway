import { $, $$ } from '../utils/dom';
import { getFindingRouteMapTemplate, getFindingRouteOptionsTemplate, getMapLineTemplate } from '../templates/map';
import { getLineOptionsTemplate } from '../templates/sections';
import UserDataManager from '../model/UserDataManager';
import { requestGetLineList, requestGetSubwayRouteList } from '../requestData/requestUserData';
import { closeModal, openModal } from '../utils/modal';
import { ELEMENT, ERROR_MESSAGE } from '../utils/constants';

class Map {
  constructor() {
    this.userDataManager = new UserDataManager();
  }

  async init() {
    this.selectDom();
    this.bindEvent();
    !this.userDataManager.lineListTemplate && (await this.setLineListTemplate());
    this.renderFirstScreen();
  }

  selectDom() {
    this.$mapWrapper = $('.map-wrapper');
    this.$mapNavBar = $('.map-nav-bar');
    this.$lineSelector = $('.line-selector');
    this.$modal = $('.modal');
    this.$modalFindingRouteOptionWrapper = $('.modal__finding-route-option-wrapper');
    this.$modalFindingRouteForm = $('.modal__finding-route-form');
  }

  bindEvent() {
    this.$mapNavBar.addEventListener('click', (e) => {
      if (e.target.classList.contains('finding-route')) {
        this.handleFindingRouteButton();
        return;
      }

      if (e.target.classList.contains('view-all-map')) {
        this.renderMapList(this.userDataManager.lines);
      }
    });

    this.$modalFindingRouteForm.addEventListener('submit', this.handleFindingRouteForm.bind(this));
    this.$lineSelector.addEventListener('change', this.handleViewSelectedLine.bind(this));
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

  renderFirstScreen() {
    this.$lineSelector.insertAdjacentHTML('beforeend', getLineOptionsTemplate(this.userDataManager.lines));
    this.renderMapList(this.userDataManager.lines);
  }

  renderMapList(lineData) {
    this.$mapWrapper.innerHTML = getMapLineTemplate(lineData);
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
      closeModal(this.$modal);
    } catch (error) {
      error.name === 'TypeError' ? alert(ERROR_MESSAGE.IMPOSSIBLE_ROUTE) : alert(error.message);
    }
  }

  handleViewSelectedLine(e) {
    const selectedLineData = [this.userDataManager.getTargetLineData(e.target.value)];
    this.renderMapList(selectedLineData);
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
