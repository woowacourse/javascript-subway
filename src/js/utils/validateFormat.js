import REGEX from '../constants/regex';

const isValidNameFormat = (name) => {
  return REGEX.NAME_FORMAT.test(name);
};

const isValidEmailFormat = (email) => {
  return REGEX.EMAIL_FORMAT.test(email.toLowerCase());
};

export { isValidNameFormat, isValidEmailFormat };
