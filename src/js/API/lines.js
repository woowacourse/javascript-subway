import { BASE_URL, HTTP } from '../constants/api.js';
import user from '../models/user.js';

async function fetchAddLine(newLineInfo) {
  const requestData = {
    method: HTTP.METHOD.POST,
    body: JSON.stringify(newLineInfo),
    headers: {
      Authorization: `Bearer ${user.authorization}`,
      [HTTP.HEADERS.KEY
        .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/lines`, requestData);

    // TODO : 에러메세지 직접 입력말고, response에서 가져오기
    // TODO : 에러메세지 별로 따로 보내기, 지금 500에러인데 이미 존재하는 노선이라고 뜸.
    if (!response.ok) {
      throw new Error('이미 존재하는 노선입니다.');
    }
    const newLine = await response.json();

    return newLine;
  } catch (error) {
    console.error(error);
  }
}

async function fetchAllLines() {
  const requestData = {
    method: HTTP.METHOD.GET,
    headers: {
      Authorization: `Bearer ${user.authorization}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/lines`, requestData);
    const lines = await response.json();

    return lines;
  } catch (error) {
    console.error(error);
  }
}

async function fetchDeleteLine(id) {
  const requestData = {
    method: HTTP.METHOD.DELETE,
    headers: {
      Authorization: `Bearer ${user.authorization}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/lines/${id}`, requestData);
    if (!response.ok) {
      throw new Error('노선 삭제에 실패했습니다.');
    }

    return response.ok;
  } catch (error) {
    console.error(error);
  }
}

export { fetchAddLine, fetchAllLines, fetchDeleteLine };
