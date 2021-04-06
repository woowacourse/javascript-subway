import { httpClient } from '../../api/httpClient';
import { getStationListTemplate } from '../../templates/stations';
import { ELEMENT } from '../../utils/constants';
import { $ } from '../../utils/dom';
import { closeModal, openModal } from '../../utils/modal';
import { validateName } from '../../validators/validation';

export default class EditStation {
  constructor(props) {
    this.props = props;
    this.stationNameInEdit = '';
  }

  selectDom() {
    this.$modal = $(`.${ELEMENT.MODAL}`);
    this.$modalStationNameEditInput = $(`.${ELEMENT.MODAL_STATION_NAME_EDIT_INPUT}`);
  }

  handleStationNameEditButton(e) {
    openModal(this.$modal);
    const { stationName } = e.target.closest(`.${ELEMENT.STATION_LIST_ITEM}`).dataset;
    this.stationNameInEdit = stationName;
    this.$modalStationNameEditInput.value = stationName;
    this.$modalStationNameEditInput.focus();
  }

  async handleStationNameEditForm(e) {
    e.preventDefault();

    const newStationName = e.target[ELEMENT.STATION_NAME].value;
    const stationId = this.props.userDataManager.getTargetStationId(this.stationNameInEdit);

    try {
      validateName(newStationName);
    } catch (error) {
      alert(error.message);
      return;
    }

    const nameEditSuccess = await httpClient.put({ path: `/stations/${stationId}`, body: { name: newStationName } });
    if (!nameEditSuccess) return;

    this.props.userDataManager.editStationName(this.stationNameInEdit, newStationName);
    this.renderEditedStation(newStationName);
    this.props.userDataManager.cleanCacheStationListTemplate();
    this.props.userDataManager.cleanCacheLineListTemplate();
    closeModal(this.$modal);
  }

  renderEditedStation(newStationName) {
    const $stationListItem = $(`[data-station-name="${this.stationNameInEdit}"]`);
    $stationListItem.outerHTML = getStationListTemplate(newStationName);
  }
}
