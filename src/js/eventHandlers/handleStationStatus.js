import { requestDeleteStation } from '../services/station';
import { ALERT_MESSAGE } from '../constants';
import station from '../store/station';
import { $ } from '../utils/dom';
import { openModal } from '../utils/modal';

const deleteStation = async target => {
  if (!window.confirm(ALERT_MESSAGE.DELETE_STATION_CONFIRM)) return;

  const $targetStation = target.closest('.station-list-item');
  const stationID = $targetStation.dataset.id;

  const result = await requestDeleteStation(stationID);
  if (!result.success) {
    alert(result.message);
    return;
  }
  station.delete(stationID);
  $targetStation.remove();

  alert(ALERT_MESSAGE.DELETE_STATION_SUCCESS);
};

const handleStationStatus = async ({ target }) => {
  if (target.classList.contains('js-station-delete-button')) {
    deleteStation(target);
    return;
  }

  if (target.classList.contains('js-station-edit-button')) {
    const { id, name } = target.closest('.station-list-item').dataset;

    $('#station-name-edit-form').dataset.stationId = id;
    $('#station-name-edit-form').dataset.oldStationName = name;
    $('#station-edit-name').value = name;

    openModal($('#station-name-edit-modal'));
    $('#station-edit-name').focus();

    return;
  }
};

export default handleStationStatus;
