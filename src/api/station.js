import { sessionStore } from '../utils/utils.js';
import { SESSION_STORAGE_KEY } from '../constants.js';
import request from './request.js';

export const requestStationRegistration = async stationName => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;

  const response = await request.post({
    url: `${API_END_POINT}/stations`,
    token: accessToken,
    bodyContent: { name: stationName },
  });
  const { id, name } = await response.json();

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }

  return { id, name };
};

export const requestStationUpdate = async (stationId, stationName) => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;

  const response = await request.put({
    url: `${API_END_POINT}/stations/${stationId}`,
    token: accessToken,
    bodyContent: { name: stationName },
  });

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }
};

export const requestStationList = async () => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;

  const response = await request.get({
    url: `${API_END_POINT}/stations`,
    token: accessToken,
  });

  if (!response.ok) {
    throw new Error('역 조회 실패');
  }
  const stationList = await response.json();

  return stationList;
};

export const requestStationDelete = async stationId => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;

  const response = await request.delete({
    url: `${API_END_POINT}/stations/${stationId}`,
    token: accessToken,
  });

  if (!response.ok) {
    throw new Error('역 삭제 실패');
  }
};
