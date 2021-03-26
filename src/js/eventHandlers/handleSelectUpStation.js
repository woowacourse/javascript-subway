import store from '../store';
import { $ } from '../utils/dom';
import { initDownStationSelect } from '../viewController/lines';

const handleSelectUpStation = event => {
  const upStationId = event.target.value;
  const filteredStations = store.station.get().filter(({ id }) => id !== Number(upStationId));

  $('#line-add-form #arrival-station').disabled = false;
  initDownStationSelect(filteredStations);
};

export default handleSelectUpStation;
