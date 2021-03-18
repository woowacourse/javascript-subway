import { API } from '../constants';

const fetchOption = (method, body = {}, accessToken = '') => ({
  method,
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
  },
});

const httpClient = {
  get: path => fetch(API.BASE_URL + path, fetchOption(API.HTTP_METHOD.GET, null, '')),
  post: (path, body) => fetch(API.BASE_URL + path, fetchOption(API.HTTP_METHOD.POST, body, '')),
};

export default httpClient;
