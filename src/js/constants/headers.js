const HEADERS = {
  CONTENT_TYPE: {
    JSON: { 'Content-Type': 'application/json' },
  },
  AUTHORIZATION: {
    BEARER: (token) => (token ? { Authorization: `Bearer ${token}` } : null),
  },
};

export default HEADERS;
