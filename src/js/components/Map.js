import { $, $$ } from '../utils/dom';
import { getFindingRouteMapTemplate, getFindingRouteOptionsTemplate, getMapLineTemplate } from '../templates/map';
import { getLineOptionsTemplate } from '../templates/sections';
import UserDataManager from '../model/UserDataManager';
import { closeModal, openModal } from '../utils/modal';
import { ELEMENT, PATH, TYPE_JSON } from '../utils/constants';
import { httpClient } from '../api/httpClient';

class Map {
  constructor(props) {
    this.userDataManager = new UserDataManager();
    this.props = props;
  }

  async init() {
    this.selectDom();
    this.bindEvent();
    !this.userDataManager.lineListTemplate && (await this.setLineListTemplate());
    this.renderFirstScreen();
  }

  selectDom() {
    this.$mapWrapper = $(`.${ELEMENT.MAP_WRAPPER}`);
    this.$mapNavBar = $(`.${ELEMENT.MAP_NAV_BAR}`);
    this.$lineSelector = $(`.${ELEMENT.LINE_SELECTOR}`);
    this.$modal = $(`.${ELEMENT.MODAL}`);
    this.$modalFindingRouteOptionWrapper = $(`.${ELEMENT.MODAL_FINDING_ROUTE_OPTION_WRAPPER}`);
    this.$modalFindingRouteForm = $(`.${ELEMENT.MODAL_FINDING_ROUTE_FORM}`);
  }

  bindEvent() {
    this.$mapNavBar.addEventListener('click', (e) => {
      if (e.target.classList.contains(ELEMENT.FINDING_ROUTE)) {
        this.handleFindingRouteButton();
        return;
      }

      if (e.target.classList.contains(ELEMENT.VIEW_ALL_MAP)) {
        this.props.initializeRoutedPage(PATH.MAP);
      }
    });

    this.$modalFindingRouteForm.addEventListener('submit', this.handleFindingRouteForm.bind(this));
    this.$lineSelector.addEventListener('change', this.handleViewSelectedLine.bind(this));
  }

  async setLineListTemplate() {
    const lineData = await httpClient.get({ path: `/lines`, returnType: TYPE_JSON });
    if (!lineData) return;

    this.userDataManager.setLineData(lineData);
    this.userDataManager.cacheLineListTemplate();
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
    $$(`.${ELEMENT.STATION_LIST_ITEM}`).forEach(($stationList) => {
      if ($stationList.nextElementSibling.classList.contains(ELEMENT.MAP_LINE_NAME)) return;

      const suitableWidth = $stationList.querySelector(`.${ELEMENT.MAP_STATION_NAME}`).offsetWidth + 20;
      const $sectionConnectLine = $stationList.querySelector(`.${ELEMENT.SECTION_LINE}`);

      $stationList.style.marginRight = `${suitableWidth}px`;
      $sectionConnectLine.style.width = `${suitableWidth + $stationList.offsetWidth}px`;
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
    const standard = e.target[ELEMENT.FINDING_STANDARD].value;

    const subwayRouteList = await await httpClient.get({
      path: `/paths?source=${upStationId}&target=${downStationId}&type=${standard}`,
      returnType: TYPE_JSON,
    });
    if (!subwayRouteList) return;

    this.renderFindingRouteTemplate(subwayRouteList);
    closeModal(this.$modal);
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
