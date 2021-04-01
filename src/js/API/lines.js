import { BASE_URL, HTTP } from '../constants/api.js';
import { COOKIE_KEY } from '../constants/constants.js';
import jwtToken from '../jwtToken.js';
import user from '../models/user.js';

async function fetchAllLines() {
  const requestData = {
    method: HTTP.METHOD.GET,
    headers: {
      [HTTP.HEADERS.KEY.AUTHORIZATION]: `${
        HTTP.HEADERS.VALUE.BEARER
      } ${jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/lines`, requestData);

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (response) {
    console.error(await response.text());

    return response;
  }
}

async function fetchAddLine(newLineInfo) {
  const requestData = {
    method: HTTP.METHOD.POST,
    body: JSON.stringify(newLineInfo),
    headers: {
      [HTTP.HEADERS.KEY.AUTHORIZATION]: `${
        HTTP.HEADERS.VALUE.BEARER
      } ${jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)}`,
      [HTTP.HEADERS.KEY
        .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/lines`, requestData);

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (response) {
    console.error(await response.text());

    return response;
  }
}

async function fetchModifyLine(modifiedLineId, modifiedLineInfo) {
  const requestData = {
    method: HTTP.METHOD.PUT,
    body: JSON.stringify(modifiedLineInfo),
    headers: {
      [HTTP.HEADERS.KEY.AUTHORIZATION]: `${
        HTTP.HEADERS.VALUE.BEARER
      } ${jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)}`,
      [HTTP.HEADERS.KEY
        .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/lines/${modifiedLineId}`,
      requestData
    );

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (response) {
    console.error(await response.text());

    return response;
  }
}

async function fetchDeleteLine(id) {
  const requestData = {
    method: HTTP.METHOD.DELETE,
    headers: {
      [HTTP.HEADERS.KEY.AUTHORIZATION]: `${
        HTTP.HEADERS.VALUE.BEARER
      } ${jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/lines/${id}`, requestData);
    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (response) {
    console.error(await response.text());

    return response;
  }
}

export { fetchAddLine, fetchAllLines, fetchDeleteLine, fetchModifyLine };
