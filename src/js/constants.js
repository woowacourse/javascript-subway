const MESSAGE = {
  ERROR: {
    PAGE_NOT_FOUND: '존재하지 않는 페이지입니다.',
  },
};

const BASE_URL = 'http://15.164.230.130:8080';

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

export { MESSAGE, BASE_URL, HTTP };
