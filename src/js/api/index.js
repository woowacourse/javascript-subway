import { PATH } from '../constants/url';
import { BASE_URL } from '../constants/url';
import {
  ERROR_MESSAGE,
  INVALID_MESSAGE,
  SNACKBAR_MESSAGE,
} from '../constants/message';
import HTTPError from '../error/HTTPError';
import {
  isJsonResponseData,
  request,
  requestWithAccessToken,
  requestWithBody,
  requestWithAccessTokenAndBody,
} from '../utils/request';
import LOCAL_STORAGE_KEY from '../constants/localStorage';
import App from '../App';
import Router from '../Router';
import { showSnackbar } from '../utils/snackbar';
import { AUTHENTICATED_LINK } from '../constants/link';

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

      const { accessToken } = data;

      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESSTOKEN, accessToken);
      App.setIsLogin(true);

      Router.goPage(AUTHENTICATED_LINK.STATION.PATH);
      showSnackbar(SNACKBAR_MESSAGE.LOGIN.SUCCESS);
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

      Router.goPage(AUTHENTICATED_LINK.STATION.PATH);
      showSnackbar(SNACKBAR_MESSAGE.SIGNUP.SUCCESS);
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

      if (!response.ok) {
        throw new HTTPError(response.status, data.message || data);
      }

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

      if (!response.ok) {
        throw new HTTPError(
          response.status,
          data.message || data || SNACKBAR_MESSAGE.STATION.CREATE.FAIL
        );
      }

      showSnackbar(SNACKBAR_MESSAGE.STATION.CREATE.SUCCESS);
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

      if (!response.ok) {
        throw new HTTPError(response.status, data.message || data);
      }

      showSnackbar(SNACKBAR_MESSAGE.STATION.UPDATE.SUCCESS);
    },

    delete: async ({ stationId }) => {
      const response = await requestWithAccessToken(
        `${BASE_URL}${PATH.STATIONS}/${stationId}`,
        'DELETE'
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new HTTPError(response.status, data.message || data);
      }

      showSnackbar(SNACKBAR_MESSAGE.STATION.DELETE.SUCCESS);
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

      if (!response.ok) {
        throw new HTTPError(response.status, data.message || data);
      }

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

      if (!response.ok) {
        throw new HTTPError(response.status, data.message || data);
      }

      showSnackbar(SNACKBAR_MESSAGE.LINE.CREATE.SUCCESS);
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

      if (!response.ok) {
        throw new HTTPError(response.status, data.message || data);
      }

      showSnackbar(SNACKBAR_MESSAGE.LINE.UPDATE.SUCCESS);
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

      if (!response.ok) {
        throw new HTTPError(response.status, data.message || data);
      }

      showSnackbar(SNACKBAR_MESSAGE.LINE.DELETE.SUCCESS);
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

      if (!response.ok) {
        throw new HTTPError(response.status, data.message || data);
      }

      showSnackbar(SNACKBAR_MESSAGE.SECTION.CREATE.SUCCESS);
    },

    delete: async ({ lineId, stationId }) => {
      const response = await requestWithAccessToken(
        `${BASE_URL}${PATH.LINES}/${lineId}${PATH.SECTIONS}?stationId=${stationId}`,
        'DELETE'
      );

      const data = isJsonResponseData(response)
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new HTTPError(response.status, data.message || data);
      }

      showSnackbar(SNACKBAR_MESSAGE.SECTION.DELETE.SUCCESS);
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
