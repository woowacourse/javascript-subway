import { ALERT_MESSAGE, STATION_NAME } from '../constants';
import { requestAddStation } from '../services/station';
import { stationListItemTemplate } from '../templates/stations';
import { $, appendChildTemplate } from '../utils/dom';

const isValid = value => value.length >= STATION_NAME.MIN_LENGTH && value.length <= STATION_NAME.MAX_LENGTH;

const handleAddStation = async event => {
  event.preventDefault();

  const inputValue = event.target.stationName.value.trim();

  if (!isValid(inputValue)) {
    alert(ALERT_MESSAGE.INVALID_STATION_NAME);
    return;
  }

  const result = await requestAddStation(inputValue);

  if (!result.success) {
    alert(result.message);
    return;
  }

  appendChildTemplate($('#station-list'), stationListItemTemplate(result.data));
  event.target.reset();
};

export default handleAddStation;
