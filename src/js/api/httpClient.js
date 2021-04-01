import { API_END_POINT, METHOD } from '../utils/constants';

const fetchOptions = ({ method, body, accessToken = '' }) => {
  return {
    method,
    body: body && JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: accessToken && `Bearer ${accessToken}`,
    },
  };
};

export const httpClient = {
  get: ({ path, accessToken }) => fetch(`${API_END_POINT}${path}`, fetchOptions({ accessToken })),
  post: ({ path, body, accessToken }) =>
    fetch(`${API_END_POINT}${path}`, fetchOptions({ method: METHOD.POST, body, accessToken })),
  put: ({ path, body, accessToken }) =>
    fetch(`${API_END_POINT}${path}`, fetchOptions({ method: METHOD.PUT, body, accessToken })),
  delete: ({ path, accessToken }) =>
    fetch(`${API_END_POINT}${path}`, fetchOptions({ method: METHOD.DELETE, accessToken })),
};
