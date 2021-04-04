import request from '../utils/request';
import HEADERS from '../constants/headers';
import { PATH } from '../constants/url';
import { BASE_URL } from '../constants/url';
import { ERROR_MESSAGE } from '../constants/message';
import ExpiredTokenError from '../error/ExpiredTokenError';

const privateApis = {
  stations: {
    get: async ({ accessToken }) => {
      const response = await request.get({
        url: BASE_URL + PATH.STATIONS,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
        },
      });

      if (response.status === 401) {
        throw ExpiredTokenError(ERROR_MESSAGE.INVALID_TOKEN);
      }

      const data = await response.json();

      if (!response.ok) throw Error(data.message);

      return data;
    },

    post: async ({ accessToken, body }) => {
      const response = await request.post({
        url: BASE_URL + PATH.STATIONS,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
          body: JSON.stringify(body),
        },
      });

      if (response.status === 401) {
        throw ExpiredTokenError(ERROR_MESSAGE.INVALID_TOKEN);
      }

      const message = await response.text();

      if (!response.ok) throw Error(message);
    },

    put: async ({ stationId, accessToken, body }) => {
      const response = await request.put({
        url: `${BASE_URL}${PATH.STATIONS}/${stationId}`,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
          body: JSON.stringify(body),
        },
      });

      if (response.status === 401) {
        throw ExpiredTokenError(ERROR_MESSAGE.INVALID_TOKEN);
      }

      const message = await response.text();

      if (!response.ok) throw Error(message);
    },

    delete: async ({ stationId, accessToken }) => {
      const response = await request.delete({
        url: `${BASE_URL}${PATH.STATIONS}/${stationId}`,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
        },
      });

      if (response.status === 401) {
        throw ExpiredTokenError(ERROR_MESSAGE.INVALID_TOKEN);
      }

      const message = await response.text();

      if (!response.ok) throw Error(message);
    },
  },

  lines: {
    get: async ({ accessToken }) => {
      const response = await request.get({
        url: BASE_URL + PATH.LINES,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
        },
      });

      if (response.status === 401) {
        throw ExpiredTokenError(ERROR_MESSAGE.INVALID_TOKEN);
      }

      const data = await response.json();

      if (!response.ok) throw Error(data.message);

      return data;
    },

    post: async ({ accessToken, body }) => {
      const response = await request.post({
        url: BASE_URL + PATH.LINES,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
          body: JSON.stringify(body),
        },
      });

      if (response.status === 401) {
        throw ExpiredTokenError(ERROR_MESSAGE.INVALID_TOKEN);
      }

      const data = await response.json();

      if (!response.ok) throw Error(data.message);
    },

    put: async ({ lineId, accessToken, body }) => {
      const response = await request.put({
        url: `${BASE_URL}${PATH.LINES}/${lineId}`,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
          body: JSON.stringify(body),
        },
      });

      if (response.status === 401) {
        throw ExpiredTokenError(ERROR_MESSAGE.INVALID_TOKEN);
      }

      const data = await response.text();

      if (!response.ok) throw Error(data);
    },

    delete: async ({ lineId, accessToken }) => {
      const response = await request.delete({
        url: `${BASE_URL}${PATH.LINES}/${lineId}`,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
        },
      });

      if (response.status === 401) {
        throw ExpiredTokenError(ERROR_MESSAGE.INVALID_TOKEN);
      }

      const message = await response.text();

      if (!response.ok) throw Error(message);
    },
  },

  sections: {
    post: async ({ lineId, accessToken, body }) => {
      const response = await request.post({
        url: `${BASE_URL}${PATH.LINES}/${lineId}${PATH.SECTIONS}`,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
          body: JSON.stringify(body),
        },
      });

      if (response.status === 401) {
        throw ExpiredTokenError(ERROR_MESSAGE.INVALID_TOKEN);
      }

      const message = await response.text();

      if (!response.ok) throw Error(message);
    },

    delete: async ({ lineId, stationId, accessToken }) => {
      const response = await request.delete({
        url: `${BASE_URL}${PATH.LINES}/${lineId}${PATH.SECTIONS}?stationId=${stationId}`,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
        },
      });

      if (response.status === 401) {
        throw ExpiredTokenError(ERROR_MESSAGE.INVALID_TOKEN);
      }

      const message = await response.text();

      if (!response.ok) throw Error(message);
    },
  },
};

export default privateApis;
