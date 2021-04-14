import LOCAL_STORAGE_KEY from '../constants/localStorage';
import HEADERS from '../constants/headers';

const isJsonResponseData = (response) => {
  const contentType = response.headers.get('content-type');
  return contentType.includes('application/json');
};

const request = (url, method) => {
  return fetch(url, {
    method,
    headers: {
      ...HEADERS.CONTENT_TYPE.JSON,
      ...HEADERS.AUTHORIZATION.BEARER(accessToken),
    },
  });
};

const requestWithAccessToken = (url, method) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);
  return fetch(url, {
    method,
    headers: {
      ...HEADERS.CONTENT_TYPE.JSON,
      ...HEADERS.AUTHORIZATION.BEARER(accessToken),
    },
  });
};

const requestWithBody = (url, method, body) => {
  return fetch(url, {
    method,
    headers: {
      ...HEADERS.CONTENT_TYPE.JSON,
    },
    body: JSON.stringify(body),
  });
};

const requestWithAccessTokenAndBody = (url, method, body) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESSTOKEN);
  return fetch(url, {
    method,
    headers: {
      ...HEADERS.CONTENT_TYPE.JSON,
      ...HEADERS.AUTHORIZATION.BEARER(accessToken),
    },
    body: JSON.stringify(body),
  });
};

export {
  isJsonResponseData,
  request,
  requestWithAccessToken,
  requestWithBody,
  requestWithAccessTokenAndBody,
};
