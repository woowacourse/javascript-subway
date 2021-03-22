import { sessionStore } from '../utils/utils.js';
import { SESSION_STORAGE_KEY } from '../constants.js';

export const requestStationRegistration = async stationName => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${API_END_POINT}/stations`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ name: stationName }),
  });
  const { id, name } = await response.json();

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }

  return { id, name };
};

export const requestStationList = async () => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${API_END_POINT}/stations`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('역 조회 실패');
  }

  const list = await response.json();
  return list;
};
