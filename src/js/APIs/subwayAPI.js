import handleError from "./errorHandler.js";

const request = {
  endPoint: "https://www.boorownie.com",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },

  createURL(path, params = {}) {
    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    return `${this.endPoint}${path}${queryString && `?${queryString}`}`;
  },

  async get({ path, params = {}, headers = {} }) {
    const response =
      Object.keys(headers).length === 0
        ? await fetch(this.createURL(path, params))
        : await fetch(this.createURL(path, params), {
            headers: {
              ...this.headers,
              ...headers,
            },
          });

    return handleError(response);
  },

  async post({ path, headers = {}, body }) {
    const response = await fetch(this.createURL(path), {
      method: "POST",
      headers: {
        ...this.headers,
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return handleError(response);
  },

  async put({ path, headers = {}, body }) {
    const response = await fetch(this.createURL(path), {
      method: "PUT",
      headers: {
        ...this.headers,
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return handleError(response);
  },

  async delete({ path, params = {}, headers = {} }) {
    const response = await fetch(this.createURL(path, params), {
      method: "DELETE",
      headers: {
        ...this.headers,
        ...headers,
      },
    });

    return handleError(response);
  },
};

export default request;
