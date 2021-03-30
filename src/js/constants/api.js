const ORIGIN = 'https://www.boorownie.com';

export const API_ENDPOINT = Object.freeze({
  EMAIL_VALIDATION: `${ORIGIN}/members/check-validation`,
  SIGN_UP: `${ORIGIN}/members`,
  LOGIN: `${ORIGIN}/login/token`,
  STATIONS: `${ORIGIN}/stations`,
});

export const STATUS_CODE = {
  AUTH_FAILED: 401,
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
  STATIONS: {
    CREATE: {
      OK: 201,
      DUPLICATED: 400,
    },
    READ: {
      OK: 200,
    },
    UPDATE: {
      OK: 200,
      DUPLICATED: 400,
    },
    REMOVE: {
      OK: 204,
    },
  },
};

export const HEADERS = {
  'Content-Type': 'application/json; charset=UTF-8',
};
