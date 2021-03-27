import { ERROR_MESSAGE } from '../../constants';
import { isEmptyString, isInRange } from '../../utils/validation';

export const checkStationValid = name => {
  if (!isInRange(name.length, { min: 2, max: 20 })) {
    return ERROR_MESSAGE.OVER_RANGE_STATION_NAME;
  }

  if (isEmptyString(name)) {
    return ERROR_MESSAGE.EMPTY_STATION_NAME;
  }
};
