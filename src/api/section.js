import { SESSION_STORAGE_KEY } from '../constants.js';
import { sessionStore } from '../utils/utils.js';
import request from './request.js';

export const requestSectionRegistration = async (line, section) => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await request.post({
    url: `${API_END_POINT}/lines/${line.id}/sections`,
    token: accessToken,
    bodyContent: section,
  });
  if (!response.ok) {
    throw new Error('역 등록 실패');
  }
};

export const requestSectionDelete = async (lineId, stationId) => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await request.delete({
    url: `${API_END_POINT}/lines/${lineId}/sections?stationId=${stationId}`,
    token: accessToken,
  });

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }
};
