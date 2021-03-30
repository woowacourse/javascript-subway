import { BASE_URL, HTTP } from '../constants/api.js';
import { ALERT_MESSAGE } from '../constants/messages.js';
import user from '../models/user.js';

async function fetchAllStations() {
  const requestData = {
    method: HTTP.METHOD.GET,
    headers: {
      [HTTP.HEADERS.KEY
        .AUTHORIZATION]: `${HTTP.HEADERS.VALUE.BEARER} ${user.authorization}`,
      [HTTP.HEADERS.KEY
        .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/stations`, requestData);
    if (!response.ok) {
      throw response;
    }

    return await response.json();
  } catch (response) {
    console.error(await response.text());
  }
}

async function fetchAddStation(stationName) {
  const requestData = {
    method: HTTP.METHOD.POST,
    body: JSON.stringify({
      name: stationName,
    }),
    headers: {
      [HTTP.HEADERS.KEY
        .AUTHORIZATION]: `${HTTP.HEADERS.VALUE.BEARER} ${user.authorization}`,
      [HTTP.HEADERS.KEY
        .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/stations`, requestData);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const newStation = await response.json();

    return newStation;
  } catch (error) {
    console.error(error);
  }
}

async function fetchModifyStation(id, name) {
  const requestData = {
    method: HTTP.METHOD.PUT,
    body: JSON.stringify({ name }),
    headers: {
      [HTTP.HEADERS.KEY
        .AUTHORIZATION]: `${HTTP.HEADERS.VALUE.BEARER} ${user.authorization}`,
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
      [HTTP.HEADERS.KEY
        .AUTHORIZATION]: `${HTTP.HEADERS.VALUE.BEARER} ${user.authorization}`,
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
