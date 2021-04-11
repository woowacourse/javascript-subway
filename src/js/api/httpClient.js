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

const httpClient = {
  get: ({ path, accessToken }) => fetch(`${API_END_POINT}${path}`, fetchOptions({ accessToken })),
  post: ({ path, body, accessToken }) =>
    fetch(`${API_END_POINT}${path}`, fetchOptions({ method: METHOD.POST, body, accessToken })),
  put: ({ path, body, accessToken }) =>
    fetch(`${API_END_POINT}${path}`, fetchOptions({ method: METHOD.PUT, body, accessToken })),
  delete: ({ path, accessToken }) =>
    fetch(`${API_END_POINT}${path}`, fetchOptions({ method: METHOD.DELETE, accessToken })),
};

export const subwayFetch = async (fetchMethod, fetchData, errorMessage) => {
  try {
    let response;

    if (fetchMethod === 'get') response = await httpClient.get(fetchData);
    if (fetchMethod === 'post') response = await httpClient.post(fetchData);
    if (fetchMethod === 'delete') response = await httpClient.delete(fetchData);
    if (fetchMethod === 'put') response = await httpClient.put(fetchData);

    if (!response.ok) {
      throw await response.text();
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error(errorMessage || error);
  }
};
