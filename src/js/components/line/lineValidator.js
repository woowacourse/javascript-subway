import { ERROR_MESSAGE } from '../../constants';
import {
  isEmptyString,
  isFormDataLacked,
  isInRange,
} from '../../utils/validation';

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
    !isInRange(Number(lineInfo['distance']), { min: 0 }) ||
    !isInRange(Number(lineInfo['arrival']), { min: 0 })
  ) {
    return ERROR_MESSAGE.NEGATIVE_NUMBER;
  }
};

export const checkLineModifyValid = ({ name, color }) => {
  if (!isInRange(name.length, { min: 2, max: 10 })) {
    return ERROR_MESSAGE.OVER_RANGE_LINE_NAME;
  }

  if (isEmptyString(color) || isEmptyString(name)) {
    return ERROR_MESSAGE.EMPTY_VALUE;
  }
};
