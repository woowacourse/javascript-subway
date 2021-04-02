import request from '../utils/request';
import HEADERS from '../constants/headers';
import { PATH } from '../constants/url';
import { BASE_URL } from '../constants/url';
import { ERROR_MESSAGE } from '../constants/message';
import ExpiredTokenError from '../error/ExpiredTokenError';

const checkResponseAndThrowErrorIfNotOk = async (response) => {
  if (response.status === 401) {
    throw ExpiredTokenError(ERROR_MESSAGE.INVALID_TOKEN);
  }

  if (!response.ok) throw Error(await response.text());
};

const privateApis = {
  Stations: {
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

      await checkResponseAndThrowErrorIfNotOk(response);

      return await response.json();
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

      await checkResponseAndThrowErrorIfNotOk(response);
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

      await checkResponseAndThrowErrorIfNotOk(response);
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

      await checkResponseAndThrowErrorIfNotOk(response);
    },
  },

  Lines: {
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

      await checkResponseAndThrowErrorIfNotOk(response);

      return await response.json();
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

      await checkResponseAndThrowErrorIfNotOk(response);
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

      await checkResponseAndThrowErrorIfNotOk(response);
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

      await checkResponseAndThrowErrorIfNotOk(response);
    },
  },

  Sections: {
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

      await checkResponseAndThrowErrorIfNotOk(response);
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

      await checkResponseAndThrowErrorIfNotOk(response);
    },
  },
};

export default privateApis;
