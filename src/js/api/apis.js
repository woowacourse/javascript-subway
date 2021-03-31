// import getFetchParams from './getFetchParams.js';

// const getSubwayState = async (accessToken) => {
//   const [stations, lines] = await Promise.all([
//     fetchGetItemList(PATH.STATIONS, accessToken),
//     fetchGetItemList(PATH.LINES, accessToken),
//   ]);

//   return { stations, lines };
// };

// const fetchGetItemList = async (path, accessToken) => {
//   try {
//     const params = getFetchParams({ path, accessToken });
//     const response = await request.get(params);

//     if (!response.ok) throw Error(await response.text());

//     const itemList = await response.json();
//     return itemList;
//   } catch (error) {
//     console.error(error.message);
//     return [];
//   }
// };

import request from '../utils/request.js';
import HEADERS from '../constants/headers.js';
import { PATH } from '../constants/url.js';
import { BASE_URL } from '../constants/url.js';

const publicApis = {
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
