import { BASE_URL, HTTP } from '../constants/api.js';
import user from '../models/user.js';

async function fetchAddStation(stationName) {
  const requestData = {
    method: HTTP.METHOD.POST,
    body: JSON.stringify({
      name: stationName,
    }),
    headers: {
      Authorization: `Bearer ${user.authorization}`,
      [HTTP.HEADERS.KEY
        .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/stations`, requestData);

    // TODO : 에러메세지 직접 입력말고, response에서 가져오기
    if (!response.ok) {
      throw new Error('이미 존재하는 역입니다.');
    }

    const newStation = await response.json();

    return newStation;
  } catch (error) {
    console.error(error);
  }
}

async function fetchAllStations() {
  const requestData = {
    method: HTTP.METHOD.GET,
    headers: {
      Authorization: `Bearer ${user.authorization}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/stations`, requestData);
    const stations = await response.json();

    return stations;
  } catch (error) {
    console.error(error);
  }
}

async function fetchDeleteStation(id) {
  const requestData = {
    method: HTTP.METHOD.DELETE,
    headers: {
      Authorization: `Bearer ${user.authorization}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/stations/${id}`, requestData);
    if (!response.ok) {
      throw new Error('역 삭제에 실패했습니다.');
    }

    return response.ok;
  } catch (error) {
    console.error(error);
  }
}

async function fetchModifyStation(id, name) {
  const requestData = {
    method: HTTP.METHOD.PUT,
    body: JSON.stringify({ name }),
    headers: {
      Authorization: `Bearer ${user.authorization}`,
      [HTTP.HEADERS.KEY
        .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/stations/${id}`, requestData);
    if (!response.ok) {
      throw new Error('역 수정에 실패했습니다.');
    }

    return response.ok;
  } catch (error) {
    console.error(error);
  }
}

export {
  fetchAddStation,
  fetchAllStations,
  fetchDeleteStation,
  fetchModifyStation,
};
