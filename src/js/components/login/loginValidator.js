import { ERROR_MESSAGE } from '../../constants';
import { isEmpty } from '../../utils/validation';

export const checkLoginValid = ({ email, password }) => {
  switch (true) {
    case isEmpty(email):
      return ERROR_MESSAGE.EMPTY_EMAIL;

    case isEmpty(password):
      return ERROR_MESSAGE.EMPTY_PASSWORD;
  }
};
