import { requestDeleteStation, requestEditStation } from '../services/station';
import { ALERT_MESSAGE } from '../constants';
import station from '../store/station';

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

const startEditStation = target => {
  const $targetStation = target.closest('.station-list-item');
  $targetStation.classList.add('editing');
};

const endEditStation = async target => {
  const $targetStation = target.closest('.station-list-item');
  const { id } = $targetStation.dataset;
  const name = $targetStation.querySelector('.js-name-edit').value;

  if (name === $targetStation.dataset.name) {
    $targetStation.classList.remove('editing');
    return;
  }

  if (station.includes(name)) {
    alert(ALERT_MESSAGE.DUPLICATED_STATION_NAME);
    return;
  }

  const result = await requestEditStation({ id, name });

  if (!result.success) {
    alert(result.message);
    return;
  }

  station.editName(name, id);
  $targetStation.querySelector('.js-station-name').textContent = name;
  $targetStation.classList.remove('editing');
};

const handleStationStatus = async ({ target, key }) => {
  if (target.classList.contains('js-name-edit') && key == 'Enter') {
    endEditStation(target);
    return;
  }

  if (key) return;

  if (target.classList.contains('js-station-delete-button')) {
    deleteStation(target);
    return;
  }

  if (target.classList.contains('js-station-edit-button')) {
    startEditStation(target);
    return;
  }

  if (target.classList.contains('js-station-save-button')) {
    endEditStation(target);
    return;
  }

  if (target.classList.contains('js-station-cancel-button')) {
    const $targetStation = target.closest('.station-list-item');
    $targetStation.classList.remove('editing');
    $targetStation.querySelector('.js-name-edit').value = $targetStation.dataset.name;
  }
};

export default handleStationStatus;
