import { ERROR_MESSAGE } from '../../constants';
import { isFormDataLacked, isInRange } from '../../utils/validation';

export const checkLineValid = lineInfo => {
  if (!isInRange(lineInfo['subway-line-name'].length, { min: 2, max: 10 })) {
    return ERROR_MESSAGE.OVER_RANGE_LINE_NAME;
  }

  if (isFormDataLacked(lineInfo)) {
    return ERROR_MESSAGE.EMPTY_VALUE;
  }

  if (lineInfo['up-station'] === lineInfo['down-station']) {
    return ERROR_MESSAGE.SAME_END_STATION;
  }

  if (
    !isInRange(parseInt(lineInfo['distance'], 10), { min: 0 }) ||
    !isInRange(parseInt(lineInfo['arrival'], 10), { min: 0 })
  ) {
    return ERROR_MESSAGE.NEGATIVE_NUMBER;
  }
};
