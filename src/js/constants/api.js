const ORIGIN = 'http://15.164.230.130:8080';

const API_ENDPOINT = Object.freeze({
  EMAIL_VALIDATION: `${ORIGIN}/members/check-validation`,
  SIGN_UP: `${ORIGIN}/members`,
});

export default API_ENDPOINT;
