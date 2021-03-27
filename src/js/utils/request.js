const request = {
  get: ({ url, options }) => {
    return fetch(url, { ...options });
  },

  post: ({ url, options }) => {
    return fetch(url, { method: 'POST', ...options });
  },

  put: ({ url, options }) => {
    return fetch(url, { method: 'PUT', ...options });
  },
};

export default request;
