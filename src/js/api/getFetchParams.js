import HEADERS from '../constants/headers.js';
import { BASE_URL } from '../constants/url.js';

const getFetchParams = ({ path, body, accessToken }) => {
  const authorization = accessToken
    ? HEADERS.AUTHORIZATION.BEARER(accessToken)
    : { Authorization: null };

  return {
    url: BASE_URL + path,
    options: {
      body: body ? JSON.stringify(body) : null,
      headers: {
        ...HEADERS.CONTENT_TYPE.JSON,
        ...authorization,
      },
    },
  };
};

export default getFetchParams;
