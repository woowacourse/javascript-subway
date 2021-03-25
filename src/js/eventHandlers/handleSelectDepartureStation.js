import store from '../store';
import { $ } from '../utils/dom';
import { initArrivalStationSelect } from '../viewController/lineAddModal';

const handleSelectDepartureStation = event => {
  const departureStationId = event.target.value;
  const filteredStations = store.station.get().filter(({ id }) => id !== Number(departureStationId));

  $('#arrival-station').disabled = false;
  initArrivalStationSelect(filteredStations);
};

export default handleSelectDepartureStation;
