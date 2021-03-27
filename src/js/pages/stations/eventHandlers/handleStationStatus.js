import { requestDeleteStation } from '../../../services/station';
import { STATION } from '../../../constants/alertMessage';
import store from '../../../store';
import { updateStationNameEditModal } from '../viewController';
import { openModal } from '../../../utils/modal';
import { $ } from '../../../utils/dom';

const deleteStation = async target => {
  if (!window.confirm(STATION.DELETE_STATION_CONFIRM)) return;

  const $targetStation = target.closest('.station-list-item');
  const stationID = Number($targetStation.dataset.id);

  const result = await requestDeleteStation(stationID);
  if (!result.success) {
    alert(result.message);
    return;
  }
  store.station.delete(stationID);
  $targetStation.remove();

  alert(STATION.DELETE_STATION_SUCCESS);
};

const handleStationStatus = async ({ target }) => {
  if (target.classList.contains('js-station-delete-button')) {
    deleteStation(target);
    return;
  }

  if (target.classList.contains('js-station-edit-button')) {
    const { dataset } = target.closest('.station-list-item');

    updateStationNameEditModal(dataset);
    openModal($('#station-name-edit-modal'));
    $('#station-edit-name').focus();

    return;
  }
};

export default handleStationStatus;
