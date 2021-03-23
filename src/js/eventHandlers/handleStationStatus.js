import { requestDeleteStation } from '../services/station';
import { ALERT_MESSAGE } from '../constants';
import station from '../store/station';

const handleStationStatus = async event => {
  if (event.target.classList.contains('js-station-delete-button')) {
    if (!window.confirm(ALERT_MESSAGE.DELETE_STATION_CONFIRM)) return;

    const $targetStation = event.target.closest('.station-list-item');
    const stationID = $targetStation.dataset.id;

    const result = await requestDeleteStation(stationID);
    if (!result.success) {
      alert(result.message);
      return;
    }
    station.delete(stationID);
    $targetStation.remove();

    alert(ALERT_MESSAGE.DELETE_STATION_SUCCESS);
  }
};

export default handleStationStatus;
