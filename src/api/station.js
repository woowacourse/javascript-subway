import { URL } from '../constants.js';
import { sendGetRequest, sendPostRequest, sendDeleteRequest, sendPutRequest } from '../utils/api.js';

export const requestStationRegistration = async stationName => {
  const response = await sendPostRequest(`${URL.BASE_URL}/stations`, { name: stationName });
  if (response.isTokenInvalid) return;

  const { id, name } = await response.json();

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }

  return { id, name };
};

export const requestStationList = async () => {
  const response = await sendGetRequest(`${URL.BASE_URL}/stations`);
  if (response.isTokenInvalid) return;

  const list = await response.json();
  if (!response.ok) {
    throw new Error('역 조회 실패');
  }

  return list;
};

export const requestStationDelete = async stationId => {
  const response = await sendDeleteRequest(`${URL.BASE_URL}/stations/${stationId}`);
  if (response.isTokenInvalid) return;

  if (!response.ok) {
    throw new Error('역 삭제 실패');
  }
};

export const requestStationUpdate = async (stationId, stationName) => {
  const response = await sendPutRequest(`${URL.BASE_URL}/stations/${stationId}`, { name: stationName });
  if (response.isTokenInvalid) return;

  if (!response.ok) {
    throw new Error('역 수정 실패');
  }
}