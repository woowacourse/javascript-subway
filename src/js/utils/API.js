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

const getOption = ({ method, contents, token }) => {
  const option = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (contents) {
    option.body = JSON.stringify(contents);
  }

  if (token) {
    option.headers.Authorization = `Bearer ${token}`;
  }

  return option;
};

const request = {
  get: async (info) => {
    const { url, token } = info;
    const option = getOption({ method: 'GET', token });

    return _request(url, option);
  },

  post: async (info) => {
    const { url, contents, token } = info;
    const option = getOption({ method: 'POST', contents, token });

    return _request(url, option);
  },

  delete: async (info) => {
    const { url, token } = info;
    const option = getOption({ method: 'DELETE', token });

    return _request(url, option);
  },

  put: async (info) => {
    const { url, contents, token } = info;
    const option = getOption({ method: 'PUT', contents, token });

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
