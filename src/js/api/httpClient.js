import { API } from '../constants';
import accessToken from '../store/accessToken';

const fetchOption = (method, body, accessToken = '') => ({
  method,
  body: body ? JSON.stringify(body) : null,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: accessToken ? `Bearer ${accessToken}` : null,
  },
});

const httpClient = {
  get: path => fetch(API.BASE_URL + path, fetchOption(API.HTTP_METHOD.GET, null, accessToken.get())),
  post: (path, body) => fetch(API.BASE_URL + path, fetchOption(API.HTTP_METHOD.POST, body, accessToken.get())),
  put: (path, body) => fetch(API.BASE_URL + path, fetchOption(API.HTTP_METHOD.PUT, body, accessToken.get())),
  delete: path => fetch(API.BASE_URL + path, fetchOption(API.HTTP_METHOD.DELETE, null, accessToken.get())),
};

export default httpClient;
