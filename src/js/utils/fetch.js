import { getAccessToken, isLoggedIn } from '../auth/index.js';

const COMMON_HEADERS = {
  'Content-Type': 'application/json; charset=UTF-8',
};

const XHR = (method) => {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
    throw new Error(`Invalid method: ${method}`);
  }

  return async (url, options = {}) => {
    const { headers = {}, ...configs } = options;
    const authorizationHeader = isLoggedIn() ? { Authorization: `Bearer ${getAccessToken()}` } : {};

    if (method === 'POST' && !Object.keys(configs).includes('body')) {
      throw new Error(`POST는 request body를 반드시 명시하여야 합니다.`);
    }

    return fetch(url, {
      method,
      headers: {
        ...COMMON_HEADERS,
        ...authorizationHeader,
        ...headers,
      },
      ...configs,
    });
  };
};

export const GET = XHR('GET');
export const POST = XHR('POST');
export const DELETE = XHR('DELETE');
export const PUT = XHR('PUT');
