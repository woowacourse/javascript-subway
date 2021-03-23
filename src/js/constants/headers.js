const HEADERS = {
  CONTENT_TYPE: {
    JSON: { 'Content-Type': 'application/json' },
  },
  AUTHORIZATION: {
    BEARER: (token) => ({ Authorization: `Bearer ${token}` }),
  },
};

export default HEADERS;
