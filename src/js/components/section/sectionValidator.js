import { ERROR_MESSAGE } from '../../constants';
import { isFormDataLacked, isInRange } from '../../utils/validation';

export const checkSectionValid = sectionInfo => {
  if (isFormDataLacked(sectionInfo)) {
    return ERROR_MESSAGE.EMPTY_VALUE;
  }

  if (
    !isInRange(Number(sectionInfo['distance']), { min: 0 }) ||
    !isInRange(Number(sectionInfo['arrival']), { min: 0 })
  ) {
    return ERROR_MESSAGE.NEGATIVE_NUMBER;
  }
};
