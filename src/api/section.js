import { URL } from '../constants.js';
import { sendPostRequest, sendDeleteRequest } from '../utils/api.js';

export const requestSectionRegistration = async (line, section) => {
  const response = await sendPostRequest(`${URL.BASE_URL}/lines/${line.id}/sections`, section);

  if (!response.ok) {
    throw new Error(response.status);
  }
};

export const requestSectionDelete = async (lineId, stationId) => {
  const response = await sendDeleteRequest(`${URL.BASE_URL}/lines/${lineId}/sections?stationId=${stationId}`);

  if (!response.ok) {
    throw new Error('구간 삭제 실패');
  }
}