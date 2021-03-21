const ORIGIN = 'https://www.boorownie.com';

const API_ENDPOINT = Object.freeze({
  EMAIL_VALIDATION: `${ORIGIN}/members/check-validation`,
  SIGN_UP: `${ORIGIN}/members`,
  LOGIN: `${ORIGIN}/login/token`,
});

const STATUS_CODE = {
  EMAIL_VALIDATION: {
    OK: 200,
    DUPLICATED: 422,
  },
  SIGN_UP: {
    OK: 201,
    BAD_REQUEST: 400,
    EMAIL_DUPLICATED: 400,
  },
  LOGIN: {
    OK: 200,
    FAILED: 400,
  },
};

export { API_ENDPOINT, STATUS_CODE };
