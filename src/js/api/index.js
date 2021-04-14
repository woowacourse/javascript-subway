import { PATH } from '../constants/url';
import { BASE_URL } from '../constants/url';
import { ERROR_MESSAGE, INVALID_MESSAGE } from '../constants/message';
import HTTPError from '../error/HTTPError';
import {
  isJsonResponseData,
  request,
  requestWithAccessToken,
  requestWithBody,
  requestWithAccessTokenAndBody,
} from '../utils/request';

const Apis = {
  members: {
    me: async () => {
      const response = await requestWithAccessToken(
        BASE_URL + PATH.MEMBERS.ME,
        'GET'
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new HTTPError(
          response.status,
          data.message || data || ERROR_MESSAGE.INVALID_TOKEN
        );
      }

      return data;
    },

    login: async (email, password) => {
      const response = await requestWithBody(
        BASE_URL + PATH.MEMBERS.LOGIN,
        'POST',
        {
          email,
          password,
        }
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new HTTPError(
          response.status,
          data.message || data || INVALID_MESSAGE.LOGIN.FAILED
        );
      }

      return data;
    },

    signup: async (name, email, password) => {
      const response = await requestWithBody(
        BASE_URL + PATH.MEMBERS.SIGNUP,
        'POST',
        { name, email, password }
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new HTTPError(
          response.status,
          data.message || data || INVALID_MESSAGE.LOGIN.FAILED
        );
      }
    },

    checkDuplicatedEmail: async (emailQuery) => {
      const response = await request(
        BASE_URL + PATH.MEMBERS.CHECK + emailQuery,
        'GET'
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new HTTPError(
          response.status,
          data.message || data || INVALID_MESSAGE.SIGNUP.EMAIL.DUPLICATED
        );
      }
    },
  },

  stations: {
    get: async () => {
      const response = await requestWithAccessToken(
        BASE_URL + PATH.STATIONS,
        'GET'
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok)
        throw new HTTPError(response.status, data.message || data);

      return data;
    },

    post: async ({ body }) => {
      const response = await requestWithAccessTokenAndBody(
        BASE_URL + PATH.STATIONS,
        'POST',
        body
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok)
        throw new HTTPError(response.status, data.message || data);
    },

    put: async ({ stationId, body }) => {
      const response = await requestWithAccessTokenAndBody(
        `${BASE_URL}${PATH.STATIONS}/${stationId}`,
        'PUT',
        body
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok)
        throw new HTTPError(response.status, data.message || data);
    },

    delete: async ({ stationId }) => {
      const response = await requestWithAccessToken(
        `${BASE_URL}${PATH.STATIONS}/${stationId}`,
        'DELETE'
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok)
        throw new HTTPError(response.status, data.message || data);
    },
  },

  lines: {
    get: async () => {
      const response = await requestWithAccessToken(
        BASE_URL + PATH.LINES,
        'GET'
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok)
        throw new HTTPError(response.status, data.message || data);

      return data;
    },

    post: async ({ body }) => {
      const response = await requestWithAccessTokenAndBody(
        BASE_URL + PATH.LINES,
        'POST',
        body
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok)
        throw new HTTPError(response.status, data.message || data);
    },

    put: async ({ lineId, body }) => {
      const response = await requestWithAccessTokenAndBody(
        `${BASE_URL}${PATH.LINES}/${lineId}`,
        'PUT',
        body
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok)
        throw new HTTPError(response.status, data.message || data);
    },

    delete: async ({ lineId }) => {
      const response = await requestWithAccessToken(
        `${BASE_URL}${PATH.LINES}/${lineId}`,
        'DELETE',
        body
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok)
        throw new HTTPError(response.status, data.message || data);
    },
  },

  sections: {
    post: async ({ lineId, body }) => {
      const response = await requestWithAccessTokenAndBody(
        `${BASE_URL}${PATH.LINES}/${lineId}${PATH.SECTIONS}`,
        'POST',
        body
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok)
        throw new HTTPError(response.status, data.message || data);
    },

    delete: async ({ lineId, stationId }) => {
      const response = await requestWithAccessToken(
        `${BASE_URL}${PATH.LINES}/${lineId}${PATH.SECTIONS}?stationId=${stationId}`,
        'DELETE'
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok)
        throw new HTTPError(response.status, data.message || data);
    },
  },

  getStationAndLine: async () => {
    const [stations, lines] = await Promise.all([
      Apis.stations.get(),
      Apis.lines.get(),
    ]);

    return { stations, lines };
  },
};

export default Apis;
