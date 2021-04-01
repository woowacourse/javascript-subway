import { BASE_URL, HTTP } from '../constants/api.js';
import { COOKIE_KEY } from '../constants/constants.js';
import jwtToken from '../jwtToken.js';

async function fetchAllStations() {
  const requestData = {
    method: HTTP.METHOD.GET,
    headers: {
      [HTTP.HEADERS.KEY.AUTHORIZATION]: `${
        HTTP.HEADERS.VALUE.BEARER
      } ${jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)}`,
      [HTTP.HEADERS.KEY
        .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/stations`, requestData);

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (response) {
    console.error(await response.text());

    return response;
  }
}

async function fetchAddStation(stationName) {
  const requestData = {
    method: HTTP.METHOD.POST,
    body: JSON.stringify({
      name: stationName,
    }),
    headers: {
      [HTTP.HEADERS.KEY.AUTHORIZATION]: `${
        HTTP.HEADERS.VALUE.BEARER
      } ${jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)}`,
      [HTTP.HEADERS.KEY
        .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/stations`, requestData);

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (response) {
    console.error(await response.text());

    return response;
  }
}

async function fetchModifyStation(id, name) {
  const requestData = {
    method: HTTP.METHOD.PUT,
    body: JSON.stringify({ name }),
    headers: {
      [HTTP.HEADERS.KEY.AUTHORIZATION]: `${
        HTTP.HEADERS.VALUE.BEARER
      } ${jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)}`,
      [HTTP.HEADERS.KEY
        .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/stations/${id}`, requestData);

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (response) {
    console.error(await response.text());

    return response;
  }
}

async function fetchDeleteStation(id) {
  const requestData = {
    method: HTTP.METHOD.DELETE,
    headers: {
      [HTTP.HEADERS.KEY.AUTHORIZATION]: `${
        HTTP.HEADERS.VALUE.BEARER
      } ${jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/stations/${id}`, requestData);
    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (response) {
    console.error(await response.text());

    return response;
  }
}

export {
  fetchAddStation,
  fetchAllStations,
  fetchDeleteStation,
  fetchModifyStation,
};
