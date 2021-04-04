import { SESSION_STORAGE_KEY, URL } from '../constants.js';
import { sessionStore } from '../utils/utils.js';

export const requestSectionRegistration = async (line, section) => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${URL.BASE_URL}/lines/${line.id}/sections`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(section),
  });

  if (!response.ok) {
    throw new Error(response.status);
  }
};

export const requestSectionDelete = async (lineId, stationId) => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${URL.BASE_URL}/lines/${lineId}/sections?stationId=${stationId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error('구간 삭제 실패');
  }
}