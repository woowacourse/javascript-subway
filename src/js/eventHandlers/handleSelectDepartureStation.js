import station from '../store/station';
import { $ } from '../utils/dom';
import { initArrivalStationSelect } from '../viewController/lineAddModal';

const handleSelectDepartureStation = event => {
  const departureStationId = event.target.value;
  const filteredStations = station.get().filter(({ id }) => id !== Number(departureStationId));

  $('#arrival-station').disabled = false;
  initArrivalStationSelect(filteredStations);
};

export default handleSelectDepartureStation;
