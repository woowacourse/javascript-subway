const request = {
  get: (url, options) => {
    fetch(url, { ...options });
  },
  post: (url, options) => {
    fetch(url, { method: 'POST', ...options });
  },
};

export default request;
