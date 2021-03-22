import { ALERT_MESSAGE, STATION_NAME } from '../constants';
import { requestAddStation } from '../services/station';
import station from '../store/station';
import { stationListItemTemplate } from '../templates/stations';
import { $, appendChildTemplate } from '../utils/dom';
import { isInRange } from '../utils/validation';

const validateInput = value => {
  if (!isInRange(value.length, { min: STATION_NAME.MIN_LENGTH, max: STATION_NAME.MAX_LENGTH })) {
    return {
      success: false,
      errorMessage: ALERT_MESSAGE.INVALID_STATION_NAME,
    };
  }

  if (station.includes(value)) {
    return {
      success: false,
      errorMessage: ALERT_MESSAGE.DUPLICATED_STATION_NAME,
    };
  }

  return {
    success: true,
  };
};

const handleAddStation = async event => {
  event.preventDefault();

  const inputValue = event.target.stationName.value.trim();

  const validationResult = validateInput(inputValue);

  if (!validationResult.success) {
    alert(validationResult.errorMessage);
    return;
  }

  const result = await requestAddStation(inputValue);

  if (!result.success) {
    alert(result.message);
    return;
  }

  station.add(result.data);
  appendChildTemplate($('#station-list'), stationListItemTemplate(result.data));
  event.target.reset();
};

export default handleAddStation;
