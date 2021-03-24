import { ALERT_MESSAGE } from '../constants';
import { requestEditStation } from '../services/station';
import station from '../store/station';
import { $ } from '../utils/dom';
import { closeModal } from '../utils/modal';

const handleEditStation = async event => {
  event.preventDefault();
  const { stationId, oldStationName } = event.target.dataset;
  const newStationName = event.target['station-edit-name'].value;

  if (oldStationName === newStationName) {
    closeModal($('.modal'));
    return;
  }

  if (station.includes(newStationName)) {
    alert(ALERT_MESSAGE.DUPLICATED_STATION_NAME);
    return;
  }

  const result = await requestEditStation({ id: stationId, name: newStationName });

  if (!result.success) {
    alert(result.message);
    return;
  }

  station.editName(newStationName, Number(stationId));
  closeModal($('.modal'));
  $(`[data-id="${stationId}"] .js-station-name`).textContent = newStationName;
  $(`[data-id="${stationId}"]`).dataset.name = newStationName;
};

export default handleEditStation;
