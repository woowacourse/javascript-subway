import { BASE_URL, HTTP } from '../constants/api.js';
import user from '../models/user.js';

async function fetchAddSection(newSectionInfo, lineId) {
  const requestData = {
    method: HTTP.METHOD.POST,
    body: JSON.stringify(newSectionInfo),
    headers: {
      [HTTP.HEADERS.KEY
        .AUTHORIZATION]: `${HTTP.HEADERS.VALUE.BEARER} ${user.authorization}`,
      [HTTP.HEADERS.KEY
        .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/lines/${lineId}/sections`,
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

async function fetchDeleteSection(lineId, stationId) {
  const requestData = {
    method: HTTP.METHOD.DELETE,
    headers: {
      [HTTP.HEADERS.KEY
        .AUTHORIZATION]: `${HTTP.HEADERS.VALUE.BEARER} ${user.authorization}`,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/lines/${lineId}/sections?stationId=${stationId}`,
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

export { fetchAddSection, fetchDeleteSection };
