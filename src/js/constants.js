const MESSAGE = {
  ERROR: {
    PAGE_NOT_FOUND: '존재하지 않는 페이지입니다.',
    FAIL_TO_SIGNUP: '회원가입에 실패 하셨습니다. 다시 시도 해주세요.',
    DUPLICATED_EMAIL: '중복된 이메일입니다.',
    WRONG_EMAIL_FORMAT: '알맞은 이메일 형식을 입력해 주세요.',
    CHECK_EMAIL_AND_PASSWORD: '이메일과 비밀번호를 확인해주세요.',
  },
};

const BASE_URL = 'https://www.boorownie.com';

const HTTP = {
  METHOD: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
  BODY: {
    KEY: {
      EMAIL: 'email',
      NAME: 'name',
      PASSWORD: 'password',
    },
  },
  HEADERS: {
    KEY: {
      CONTENT_TYPE: 'Content-Type',
    },
    VALUE: {
      APPLICATION_JSON: 'application/json',
      CHARSET_UTF_8: 'charset=UTF-8',
    },
  },
};

const COOKIE_KEY = {
  JWT_TOKEN: 'jwtToken',
};

const REG_EXP = {
  EMAIL: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  NAME: /\s+/g,
  PASSWORD: /^(?=.*[a-zA-z0-9]).{9,15}$/,
};
export { MESSAGE, BASE_URL, HTTP, COOKIE_KEY, REG_EXP };
