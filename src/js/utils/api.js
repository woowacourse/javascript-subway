import { REQUEST_METHOD } from '../constants';

export const request = async (
  url,
  { method = REQUEST_METHOD.GET, body = null, Accept = '', Authorization = '' },
) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization,
      Accept,
    },
    body: body ? JSON.stringify(body) : null,
  });
  if (response.ok) {
    return response;
  }

  throw response;
};