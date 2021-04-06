import { getMapLineTemplate } from '../../templates/map';
import { getLineOptionsTemplate } from '../../templates/sections';
import { ELEMENT } from '../../utils/constants';
import { $ } from '../../utils/dom';
import { setStationListStyle } from './setStyle';

export default class RenderSubwayMap {
  constructor(props) {
    this.props = props;
  }

  selectDom() {
    this.$mapWrapper = $(`.${ELEMENT.MAP_WRAPPER}`);
    this.$lineSelector = $(`.${ELEMENT.LINE_SELECTOR}`);
  }

  handleViewSelectedLine(e) {
    const selectedLineData = [this.props.userDataManager.getTargetLineData(e.target.value)];
    this.renderMapList(selectedLineData);
  }

  renderFirstScreen() {
    this.$lineSelector.insertAdjacentHTML('beforeend', getLineOptionsTemplate(this.props.userDataManager.lines));
    this.renderMapList(this.props.userDataManager.lines);
  }

  renderMapList(lineData) {
    this.$mapWrapper.innerHTML = getMapLineTemplate(lineData);
    setStationListStyle();
  }
}
