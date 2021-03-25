import { STATION_NAME } from '../constants/service';
import { STATION } from '../constants/alertMessage';
import { requestAddStation } from '../services/station';
import store from '../store';
import { isInRange } from '../utils/validation';
import { addStationListItem } from '../viewController/stationList';

const validateInput = value => {
  if (!isInRange(value.length, { min: STATION_NAME.MIN_LENGTH, max: STATION_NAME.MAX_LENGTH })) {
    return {
      success: false,
      errorMessage: STATION.INVALID_STATION_NAME,
    };
  }

  if (store.station.includes(value)) {
    return {
      success: false,
      errorMessage: STATION.DUPLICATED_STATION_NAME,
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

  store.station.add(result.data);
  addStationListItem(result.data);
  event.target.reset();
};

export default handleAddStation;
