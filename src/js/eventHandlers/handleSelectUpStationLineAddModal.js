import store from '../store';
import { $ } from '../utils/dom';
import { initDownStationSelect } from '../viewController/lines';

const handleSelectUpStationLineAddModal = event => {
  const upStationId = event.target.value;
  const filteredStations = store.station.get().filter(({ id }) => id !== Number(upStationId));

  $('#line-add-form #down-station').disabled = false;
  initDownStationSelect(filteredStations);
};

export default handleSelectUpStationLineAddModal;
