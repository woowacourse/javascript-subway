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

export { BASE_URL, HTTP };