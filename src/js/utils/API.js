const BASE_URL = 'https://www.boorownie.com';

const _request = async (url, option = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, option);
    if (!response.ok) {
      throw response.status;
    }

    return response;
  } catch (status) {
    throw status;
  }
};

const request = {
  get: async (info) => {
    const { url, token } = info;
    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      option.headers.Authorization = `Bearer ${token}`;
    }

    return _request(url, option);
  },

  post: async (info) => {
    const { url, contents, token } = info;
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(contents),
    };

    if (token) {
      option.headers.Authorization = `Bearer ${token}`;
    }
    console.log(option);
    console.log(contents);
    return _request(url, option);
  },

  delete: async (info) => {
    const { url, token } = info;
    const option = {
      method: 'DELETE',
      headers: {},
    };

    if (token) {
      option.headers.Authorization = `Bearer ${token}`;
    }

    return _request(url, option);
  },

  put: async (info) => {
    const { url, contents, token } = info;
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contents),
    };

    if (token) {
      option.headers.Authorization = `Bearer ${token}`;
    }

    return _request(url, option);
  },
};

export const API = {
  // Auth
  signup: ({ email, password, name }) => {
    return request.post({
      url: '/members',
      contents: { email, password, name },
    });
  },

  login: ({ email, password }) => {
    return request.post({
      url: '/login/token',
      contents: { email, password },
    });
  },

  getUserInfo: (token) => {
    return request.get({ url: '/members/me', token });
  },

  checkDuplicateEmail: (email) => {
    return request.get({
      url: `/members/check-validation?email=${email}`,
    });
  },

  // Stations
  getStationList: (token) => {
    return request.get({ url: '/stations', token });
  },

  createStation: ({ token, name }) => {
    return request.post({ url: '/stations', contents: { name }, token });
  },

  deleteStation: ({ token, id }) => {
    return request.delete({ url: `/stations/${id}`, token });
  },

  editStation: ({ token, name, id }) => {
    return request.put({ url: `/stations/${id}`, contents: { name }, token });
  },

  // Lines
  getLineList: (token) => {
    return request.get({ url: `/lines`, token });
  },

  getLine: ({ token, id }) => {
    return request.get({ url: `/lines/${id}`, token });
  },

  createLine: ({ token, contents }) => {
    return request.post({ url: `/lines`, contents, token });
  },

  deleteLine: ({ token, id }) => {
    return request.delete({ url: `/lines/${id}`, token });
  },

  editLine: ({ token, id, contents }) => {
    return request.put({ url: `/lines/${id}`, contents, token });
  },

  // Sections
  createSection: ({ token, id, contents }) => {
    return request.post({ url: `/lines/${id}/sections`, contents, token });
  },

  deleteSection: ({ token, lineId, stationId }) => {
    return request.delete({ url: `/lines/${lineId}/sections?stationId=${stationId}`, token });
  },
};
