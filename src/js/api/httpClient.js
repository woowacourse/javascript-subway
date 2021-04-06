import token from '../token/Token';
import { API_END_POINT, METHOD } from '../utils/constants';

const fetchOptions = ({ method, body }) => {
  return {
    method,
    body: body && JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: token.accessToken && `Bearer ${token.accessToken}`,
    },
  };
};

const subwayFetch = async ({ path, method, body, returnType, isAlert = true, alertMessage }) => {
  try {
    const response = await fetch(`${API_END_POINT}${path}`, fetchOptions({ method, body }));
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    if (returnType) {
      const data = await response[returnType]();
      return data;
    }

    return 'success';
  } catch (error) {
    isAlert && alert(alertMessage ?? error.message);
  }
};

export const httpClient = {
  get: ({ path, returnType, isAlert, alertMessage }) => subwayFetch({ path, returnType, isAlert, alertMessage }),
  post: ({ path, body, returnType, isAlert, alertMessage }) =>
    subwayFetch({ path, method: METHOD.POST, body, returnType, isAlert, alertMessage }),
  put: ({ path, body, returnType, isAlert, alertMessage }) =>
    subwayFetch({ path, method: METHOD.PUT, body, returnType, isAlert, alertMessage }),
  delete: ({ path, returnType, isAlert, alertMessage }) =>
    subwayFetch({ path, method: METHOD.DELETE, returnType, isAlert, alertMessage }),
};
