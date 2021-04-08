import { httpClient } from '../../api/httpClient';
import { getFindingRouteMapTemplate, getFindingRouteOptionsTemplate } from '../../templates/map';
import { ELEMENT, ERROR_MESSAGE, TYPE_JSON } from '../../utils/constants';
import { $ } from '../../utils/dom';
import { closeModal, openModal } from '../../utils/modal';
import { setStationListStyle } from './setStyle';

export default class FindingRoute {
  constructor(props) {
    this.props = props;
  }

  selectDom() {
    this.$modal = $(`.${ELEMENT.MODAL}`);
    this.$modalFindingRouteOptionWrapper = $(`.${ELEMENT.MODAL_FINDING_ROUTE_OPTION_WRAPPER}`);
  }

  handleFindingRouteButton() {
    this.$modalFindingRouteOptionWrapper.innerHTML = getFindingRouteOptionsTemplate(
      this.props.userDataManager.stations,
    );
    openModal(this.$modal);
  }

  async handleFindingRouteForm(e, $mapWrapper) {
    e.preventDefault();

    const upStationId = this.props.userDataManager.getTargetStationId(e.target[ELEMENT.UP_STATION].value);
    const downStationId = this.props.userDataManager.getTargetStationId(e.target[ELEMENT.DOWN_STATION].value);
    const standard = e.target[ELEMENT.FINDING_STANDARD].value;

    const subwayRouteList = await httpClient.get({
      path: `/paths?source=${upStationId}&target=${downStationId}&type=${standard}`,
      returnType: TYPE_JSON,
      alertMessage: ERROR_MESSAGE.IMPOSSIBLE_ROUTE,
    });
    if (!subwayRouteList) return;

    this.renderFindingRouteTemplate({ subwayRouteList, $mapWrapper });
    closeModal(this.$modal);
  }

  renderFindingRouteTemplate({ subwayRouteList, $mapWrapper }) {
    const stationNameList = subwayRouteList.stations.map((station) => station.name);
    const lineColorList = this.props.userDataManager.getLineColorListForFindingRoute(stationNameList);

    $mapWrapper.innerHTML = getFindingRouteMapTemplate({
      stationNameList,
      lineColorList,
      distance: subwayRouteList.distance,
      duration: subwayRouteList.duration,
    });
    setStationListStyle();
  }
}
