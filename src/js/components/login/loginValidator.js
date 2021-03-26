import { ERROR_MESSAGE } from '../../constants';
import { isEmptyString } from '../../utils/validation';

export const checkLoginValid = ({ email, password }) => {
  if (isEmptyString(email)) {
    return ERROR_MESSAGE.EMPTY_EMAIL;
  }

  if (isEmptyString(password)) {
    return ERROR_MESSAGE.EMPTY_PASSWORD;
  }
};
