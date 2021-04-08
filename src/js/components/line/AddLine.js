import { httpClient } from '../../api/httpClient';
import { getLineAddModalTemplate, getLineListTemplate } from '../../templates/lines';
import { ELEMENT, TYPE_JSON } from '../../utils/constants';
import { $ } from '../../utils/dom';
import { closeModal, openModal } from '../../utils/modal';
import { validateAddLine } from '../../validators/validation';

export default class AddLine {
  constructor(props) {
    this.props = props;
  }

  selectDom() {
    this.$modal = $(`.${ELEMENT.MODAL}`);
  }

  handleCreateLineButton() {
    this.$modal.innerHTML = getLineAddModalTemplate(this.props.userDataManager.stations);
    this.props.initModal();
    openModal(this.$modal);
  }

  async handleCreateLineForm(e, $lineListWrapper) {
    e.preventDefault();

    const lineName = e.target[ELEMENT.SUBWAY_LINE_NAME].value;
    const upStationId = this.props.userDataManager.getTargetStationId(e.target[ELEMENT.UP_STATION].value);
    const downStationId = this.props.userDataManager.getTargetStationId(e.target[ELEMENT.DOWN_STATION].value);
    const distance = e.target.distance.valueAsNumber;
    const duration = e.target.duration.valueAsNumber;
    const [selectedLineColor] = $(`.${ELEMENT.COLOR_OPTION}`).classList;

    try {
      validateAddLine({
        lineName,
        upStationId,
        downStationId,
        selectedLineColor,
        lineColorList: this.props.userDataManager.getLineColors(),
      });
    } catch (error) {
      alert(error.message);
      return;
    }

    const lineData = await httpClient.post({
      path: '/lines',
      body: { name: lineName, color: selectedLineColor, upStationId, downStationId, distance, duration },
      returnType: TYPE_JSON,
    });
    if (!lineData) return;

    this.props.userDataManager.setLineData(lineData);
    this.renderAddedLine({ lineName, lineColor: selectedLineColor, $lineListWrapper });
    this.props.userDataManager.cleanCacheLineListTemplate();
    closeModal(this.$modal);
  }

  renderAddedLine({ lineName, lineColor, $lineListWrapper }) {
    $lineListWrapper.insertAdjacentHTML('beforeend', getLineListTemplate({ lineName, lineColor }));
  }
}
