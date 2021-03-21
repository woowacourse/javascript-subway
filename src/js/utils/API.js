const BASE_URL = 'http://3.35.213.149';

const option = {
  get: (token) => ({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }),

  post: (contents) => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(contents),
  }),

  delete: () => ({
    method: 'DELETE',
  }),

  put: (contents) => ({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contents),
  }),
};

const request = async (url, option = {}) => {
  let response;
  try {
    response = await fetch(`${BASE_URL}${url}`, option);
    if (!response.ok) {
      throw new Error(response.message);
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (response.body) {
      return response.json();
    }
    return response;
  }
};

export const API = {
  signup: ({ email, password, name }) => {
    return request('/members', option.post({ email, password, name }));
  },

  login: ({ email, password }) => {
    return request('/login/token', option.post({ email, password }));
  },

  getUserInfo: (token) => {
    return request('/members/me', option.get(token));
  },

  getStationList: (token) => {
    return request('/stations', option.get(token));
  },
};
