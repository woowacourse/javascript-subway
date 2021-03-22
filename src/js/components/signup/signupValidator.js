import { ERROR_MESSAGE } from '../../constants';
import { isEmpty, isDifferent } from '../../utils/validation';

export const checkSignupValid = ({
  name,
  email,
  password,
  ['password-confirm']: passwordConfirm,
}) => {
  switch (true) {
    case isEmpty(name):
      return ERROR_MESSAGE.EMPTY_NAME;

    case isEmpty(email):
      return ERROR_MESSAGE.EMPTY_EMAIL;

    case isEmpty(password):
      return ERROR_MESSAGE.EMPTY_PASSWORD;

    case isEmpty(passwordConfirm):
      return ERROR_MESSAGE.EMPTY_PASSWORD_CONFIRM;

    case isDifferent(password, passwordConfirm):
      return ERROR_MESSAGE.DIFFERENT_PASSWORD;

    default:
      return '';
  }
};
