import { REQUEST_HEADER, REQUEST_METHOD } from '../constants';

export const request = async (
  url,
  {
    method = REQUEST_METHOD.GET,
    contentType = REQUEST_HEADER.CONTENT_TYPE_JSON,
    Authorization = '',
    Accept = '',
    body = null,
  },
) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': contentType,
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
