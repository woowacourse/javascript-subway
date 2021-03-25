import { STATION } from '../constants/alertMessage';
import { requestEditStation } from '../services/station';
import store from '../store';
import { $ } from '../utils/dom';
import { closeModal } from '../utils/modal';
import { updateStationListItem } from '../viewController/stations';

const handleEditStation = async event => {
  event.preventDefault();

  const { stationId, oldStationName } = event.target.dataset;
  const newStationName = event.target['station-edit-name'].value;

  if (oldStationName === newStationName) {
    closeModal($('.modal'));
    return;
  }

  if (store.station.includes(newStationName)) {
    alert(STATION.DUPLICATED_STATION_NAME);
    return;
  }

  const result = await requestEditStation({ id: stationId, name: newStationName });

  if (!result.success) {
    alert(result.message);
    return;
  }

  store.station.editName(newStationName, Number(stationId));
  closeModal($('.modal'));
  updateStationListItem({ id: stationId, name: newStationName });
};

export default handleEditStation;
