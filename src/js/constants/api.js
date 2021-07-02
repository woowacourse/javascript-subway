const BASE_URL = 'https://bepoz-subway.kro.kr/api';

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
      AUTHORIZATION: 'Authorization',
    },
    VALUE: {
      APPLICATION_JSON: 'application/json',
      CHARSET_UTF_8: 'charset=UTF-8',
      BEARER: 'Bearer',
    },
  },
};

export { BASE_URL, HTTP };
