import { httpClient } from '../../api/httpClient';
import { getStationOptionsTemplate } from '../../templates/lines';
import { getLineOptionsTemplate } from '../../templates/sections';
import { ELEMENT } from '../../utils/constants';
import { $ } from '../../utils/dom';
import { closeModal, openModal } from '../../utils/modal';

export default class AddSection {
  constructor(props) {
    this.props = props;
  }

  selectDom() {
    this.$modal = $(`.${ELEMENT.MODAL}`);
    this.$modalStationOptionsWrapper = $(`.${ELEMENT.MODAL_STATION_OPTIONS_WRAPPER}`);
    this.$modalLineOptionsWrapper = $(`.${ELEMENT.MODAL_LINE_OPTIONS_WRAPPER}`);
  }

  handleCreateSectionButton() {
    this.showSectionModal();
    this.clearModalInput();
  }

  showSectionModal() {
    this.$modalStationOptionsWrapper.innerHTML = getStationOptionsTemplate(this.props.userDataManager.stations);
    this.$modalLineOptionsWrapper.innerHTML = getLineOptionsTemplate(this.props.userDataManager.lines);
    openModal(this.$modal);
  }

  clearModalInput() {
    this.$modal.querySelectorAll(`.${ELEMENT.INPUT_FIELD}`).forEach((input) => (input.value = ''));
  }

  async handleCreateSectionForm(e) {
    e.preventDefault();

    const lineName = e.target[ELEMENT.SUBWAY_LINE_FOR_SECTION].value;
    const lineId = this.props.userDataManager.getTargetLineData(lineName).id;
    const upStationId = this.props.userDataManager.getTargetStationId(e.target[ELEMENT.UP_STATION].value);
    const downStationId = this.props.userDataManager.getTargetStationId(e.target[ELEMENT.DOWN_STATION].value);
    const distance = e.target.distance.valueAsNumber;
    const duration = e.target.duration.valueAsNumber;

    const addSuccess = await httpClient.post({
      path: `/lines/${lineId}/sections`,
      body: { upStationId, downStationId, distance, duration },
    });
    if (!addSuccess) return;

    const updateSuccess = await this.props.updateTargetLineData({ lineId, lineName });
    if (!updateSuccess) return;

    closeModal(this.$modal);
  }
}
