import { requestEditStation } from '../../../api/station';
import { STATION } from '../../../constants/alertMessage';
import store from '../../../store';
import { $ } from '../../../utils/dom';
import { closeModal } from '../../../utils/modal';
import snackbar from '../../../utils/snackbar';
import { updateStationListItem } from '../viewController';

const handleEditStation = async event => {
  event.preventDefault();

  const { stationId, oldStationName } = event.target.dataset;
  const newStationName = event.target['station-edit-name'].value;

  if (oldStationName === newStationName) {
    closeModal($('.modal'));
    return;
  }

  if (store.station.includes(newStationName)) {
    snackbar.open(STATION.DUPLICATED_STATION_NAME);
    return;
  }

  const result = await requestEditStation({ id: stationId, name: newStationName });

  if (!result.success) {
    snackbar.open(result.message);
    return;
  }

  store.station.editName(newStationName, Number(stationId));
  closeModal($('.modal'));
  updateStationListItem({ id: stationId, name: newStationName });

  snackbar.open(STATION.EDIT_STATION_SUCCESS);
};

export default handleEditStation;
