import { BASE_URL, HTTP } from '../constants/api.js';
import user from '../models/user.js';

async function fetchAddSection(newSectionInfo, lineId) {
  const requestData = {
    method: HTTP.METHOD.POST,
    body: JSON.stringify(newSectionInfo),
    headers: {
      Authorization: `Bearer ${user.authorization}`,
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
      throw new Error('이미 존재하는 구간입니다.');
    }

    return response.ok;
  } catch (error) {
    // 거리 유효하지 않게 넣으면 400, false
    console.error(error);
  }
}

export { fetchAddSection };
