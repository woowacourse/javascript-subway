const request = {
  get: ({ url, options }) => {
    return fetch(url, { ...options });
  },
  post: ({ url, options }) => {
    return fetch(url, { method: 'POST', ...options });
  },
};

export default request;
