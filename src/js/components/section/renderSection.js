import { getLineOptionsTemplate, getTargetSectionListTemplate } from '../../templates/sections';
import { ELEMENT } from '../../utils/constants';
import { $ } from '../../utils/dom';

export default class RenderSection {
  constructor(props) {
    this.props = props;
  }

  selectDom() {
    this.$lineListWrapper = $(`.${ELEMENT.LINE_LIST_WRAPPER}`);
    this.$lineOptionsWrapper = $(`.${ELEMENT.LINE_OPTIONS_WRAPPER}`);
  }

  handleChangeSection(e) {
    const selectedLineName = e.target.value;
    this.renderLineColor(this.props.userDataManager.getTargetLineData(selectedLineName).color);
    this.renderStationListInTargetLine(selectedLineName);
  }

  renderFirstScreen(firstLineData) {
    this.renderLineOptionsTemplate(firstLineData.color);
    this.renderStationListInTargetLine(firstLineData.name);
  }

  renderLineOptionsTemplate(firstLineColor) {
    const lineData = this.props.userDataManager.lines;
    this.renderLineColor(firstLineColor);
    this.$lineOptionsWrapper.innerHTML = getLineOptionsTemplate(lineData);
  }

  renderLineColor(newColor) {
    const [oldColor] = this.$lineOptionsWrapper.classList;
    this.$lineOptionsWrapper.classList.replace(oldColor, newColor);
  }

  renderStationListInTargetLine(selectedLineName) {
    const stationNamesInTargetLine = this.props.userDataManager.getStationNamesInTargetLine(selectedLineName);
    this.$lineListWrapper.innerHTML = getTargetSectionListTemplate(stationNamesInTargetLine);
  }
}
