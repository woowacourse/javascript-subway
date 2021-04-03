const fetchAPI = async (url, option = {}) => {
  const response = await fetch(url, option);
  try {
    if (!response.ok) {
      throw response.status;
    }
    return response  
  } catch (status) {
    throw status;
  }
}

const getOption = (method, token, bodyContent) => {
  const option = {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }
  if (token) {
    option.headers.Authorization = `Bearer ${token}`;
  }
  if (bodyContent) {
    console.log(bodyContent)
    option.body = typeof bodyContent === 'string' ? bodyContent : JSON.stringify(bodyContent);
  }
  return option;
}

const request = {
  async get({url, token = null}) {
    const option = getOption('GET', token);
    const response = await fetchAPI(url, option);

    return response;
  },
  async post({url, token = null, bodyContent = {}}) {
    const option = getOption('POST', token, bodyContent);
    console.log('url', url);
    console.log(option);
    try {
      const response = await fetchAPI(url, option);
      return response;
    } catch (status) {
      console.log(status);
      throw status;
    }
  },
  async put({url,  token = null, bodyContent = {}}) {
    const option = getOption('PUT', token, bodyContent);
    try {
      const response = await fetchAPI(url, option);
      return response;
    } catch (status) {
      throw status;
    }
  },
  async delete({url, token = null}) {
    const option = getOption('DELETE', token);
    try {
      const response = await fetchAPI(url, option);
      return response;
    } catch (status) {
      throw status;
    }
  }
}

export default request;
