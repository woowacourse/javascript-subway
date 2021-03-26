import { ERROR_MESSAGE } from '../../constants';
import { isEmptyString } from '../../utils/validation';

export const checkLoginValid = ({ email, password }) => {
  switch (true) {
    case isEmptyString(email):
      return ERROR_MESSAGE.EMPTY_EMAIL;

    case isEmptyString(password):
      return ERROR_MESSAGE.EMPTY_PASSWORD;
  }
};
