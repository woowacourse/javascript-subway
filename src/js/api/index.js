import request from '../utils/request';
import HEADERS from '../constants/headers';
import { PATH } from '../constants/url';
import { BASE_URL } from '../constants/url';

const publicApis = {
  me: ({ accessToken }) => {
    return request.get({
      url: BASE_URL + PATH.MEMBERS.ME,
      options: {
        headers: {
          ...HEADERS.CONTENT_TYPE.JSON,
          ...HEADERS.AUTHORIZATION.BEARER(accessToken),
        },
      },
    });
  },
  login: ({ body }) => {
    return request.post({
      url: BASE_URL + PATH.MEMBERS.LOGIN,
      options: {
        headers: {
          ...HEADERS.CONTENT_TYPE.JSON,
        },
        body: JSON.stringify(body),
      },
    });
  },
  signup: ({ body }) => {
    return request.post({
      url: BASE_URL + PATH.MEMBERS.SIGNUP,
      options: {
        headers: {
          ...HEADERS.CONTENT_TYPE.JSON,
        },
        body: JSON.stringify(body),
      },
    });
  },
  checkDuplicatedEmail: ({ emailQuery }) => {
    return request.get({
      url: BASE_URL + PATH.MEMBERS.CHECK + emailQuery,
      options: {
        headers: {
          ...HEADERS.CONTENT_TYPE.JSON,
        },
      },
    });
  },
};

const privateApis = {
  Stations: {
    get: ({ accessToken }) => {
      return request.get({
        url: BASE_URL + PATH.STATIONS,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
        },
      });
    },
    post: ({ accessToken, body }) => {
      return request.post({
        url: BASE_URL + PATH.STATIONS,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
          body: JSON.stringify(body),
        },
      });
    },
    put: ({ stationId, accessToken, body }) => {
      return request.put({
        url: `${BASE_URL}${PATH.STATIONS}/${stationId}`,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
          body: JSON.stringify(body),
        },
      });
    },
    delete: ({ stationId, accessToken, body }) => {
      return request.delete({
        url: `${BASE_URL}${PATH.STATIONS}/${stationId}`,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
          body: JSON.stringify(body),
        },
      });
    },
  },
  Lines: {
    get: ({ accessToken, body }) => {
      return request.get({
        url: BASE_URL + PATH.LINES,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
        },
      });
    },
    post: ({ accessToken, body }) => {
      return request.post({
        url: BASE_URL + PATH.LINES,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
          body: JSON.stringify(body),
        },
      });
    },
    put: ({ lineId, accessToken, body }) => {
      return request.put({
        url: `${BASE_URL}${PATH.LINES}/${lineId}`,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
          body: JSON.stringify(body),
        },
      });
    },
    delete: ({ lineId, accessToken, body }) => {
      return request.delete({
        url: `${BASE_URL}${PATH.LINES}/${lineId}`,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
        },
      });
    },
  },
  Sections: {
    post: ({ lineId, accessToken, body }) => {
      return request.post({
        url: `${BASE_URL}${PATH.LINES}/${lineId}${PATH.SECTIONS}`,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
          body: JSON.stringify(body),
        },
      });
    },
    delete: ({ lineId, stationId, accessToken }) => {
      return request.delete({
        url: `${BASE_URL}${PATH.LINES}/${lineId}${PATH.SECTIONS}?stationId=${stationId}`,
        options: {
          headers: {
            ...HEADERS.CONTENT_TYPE.JSON,
            ...HEADERS.AUTHORIZATION.BEARER(accessToken),
          },
        },
      });
    },
  },
};

export { publicApis, privateApis };
