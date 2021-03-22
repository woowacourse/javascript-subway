export const ALERT_MESSAGE = Object.freeze({
  INVALID_PASSWORD_CONFIRM: '비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해주세요.',
  SIGNUP_FAILED: '회원가입에 실패했습니다.',
  LOGIN_FAILED: '로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해주세요.',
  SIGNUP_SUCCESS: '회원가입 성공! 자동으로 로그인합니다.',
  INVALID_STATION_NAME: '최소 2자, 최대 20자의 역 이름을 입력해주세요',
  ADD_STATION_FAILED: '역 등록에 실패했습니다.',
});

export const API = Object.freeze({
  BASE_URL: 'https://www.boorownie.com',
  HTTP_METHOD: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
});

export const LOCAL_STORAGE_KEYS = Object.freeze({
  ACCESS_TOKEN: 'accessToken',
});

export const STATION_NAME = Object.freeze({
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
});
