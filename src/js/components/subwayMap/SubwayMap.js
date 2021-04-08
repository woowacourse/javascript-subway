import { $ } from '../../utils/dom';
import UserDataManager from '../../model/UserDataManager';
import { ELEMENT, PATH, TYPE_JSON } from '../../utils/constants';
import { httpClient } from '../../api/httpClient';
import FindingRoute from './FindingRoute';
import RenderSubwayMap from './RenderSubwayMap';

export default class SubwayMap {
  constructor(props) {
    this.userDataManager = new UserDataManager();
    this.props = props;
    this.renderSubwayMap = new RenderSubwayMap({ userDataManager: this.userDataManager });
    this.findingRoute = new FindingRoute({ userDataManager: this.userDataManager });
  }

  async init() {
    this.selectDom();
    this.bindEvent();
    !this.userDataManager.lineListTemplate && (await this.setLineListTemplate());
    this.renderSubwayMap.renderFirstScreen();
  }

  selectDom() {
    this.$mapNavBar = $(`.${ELEMENT.MAP_NAV_BAR}`);
    this.$modalFindingRouteForm = $(`.${ELEMENT.MODAL_FINDING_ROUTE_FORM}`);
    this.findingRoute.selectDom();
    this.renderSubwayMap.selectDom();
  }

  bindEvent() {
    this.$mapNavBar.addEventListener('click', (e) => {
      if (e.target.classList.contains(ELEMENT.FINDING_ROUTE)) {
        this.findingRoute.handleFindingRouteButton();
        return;
      }

      if (e.target.classList.contains(ELEMENT.VIEW_ALL_MAP)) {
        this.props.initializeRoutedPage(PATH.MAP);
      }
    });

    this.renderSubwayMap.$lineSelector.addEventListener('change', (e) =>
      this.renderSubwayMap.handleViewSelectedLine(e),
    );

    this.$modalFindingRouteForm.addEventListener('submit', (e) =>
      this.findingRoute.handleFindingRouteForm(e, this.renderSubwayMap.$mapWrapper),
    );
  }

  async setLineListTemplate() {
    const lineData = await httpClient.get({ path: `/lines`, returnType: TYPE_JSON });
    if (!lineData) return;

    this.userDataManager.setLineData(lineData);
    this.userDataManager.cacheLineListTemplate();
  }
}
