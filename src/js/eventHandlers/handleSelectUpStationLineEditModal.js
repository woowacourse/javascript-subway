import store from '../store';
import { initDownStationSelect } from '../viewController/lines';

const handleSelectUpStationLineEditModal = event => {
  const upStationId = event.target.value;
  const filteredStations = store.station.get().filter(({ id }) => id !== Number(upStationId));

  initDownStationSelect(filteredStations);
};

export default handleSelectUpStationLineEditModal;
