import { SESSION_STORAGE_KEY } from '../constants.js';
import { sessionStore } from '../utils/utils.js';
import request from './request.js'

export const requestLineRegistration = async line => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await request.post({
    url: `${API_END_POINT}/lines`,
    token: accessToken,
    bodyContent: {
      name: line.name,
      color: line.color,
      upStationId: Number(line.upStationId),
      downStationId: Number(line.downStationId),
      distance: Number(line.distance),
      duration: Number(line.duration),
    }
  });

  const newLine = await response.json();
  const processedNewLine = {
    id: Number(newLine.id),
    name: newLine.name,
    color: newLine.color,
    stations: newLine.stations,
    sections: newLine.sections,
  };

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }

  return processedNewLine;
};

export const requestLineList = async () => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await request.get({
    url: `${API_END_POINT}/lines`,
    token: accessToken
  });

  const newLineList = await response.json();

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }

  return newLineList.map(line => ({
    id: Number(line.id),
    name: line.name,
    color: line.color,
    stations: line.stations,
    sections: line.sections,    
  }));
};

export const requestLineDelete = async lineId => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await request.delete({
    url: `${API_END_POINT}/lines/${lineId}`,
    token: accessToken
  });

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }
}

export const requestLineUpdate = async (newline) => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await request.put({
    url: `${API_END_POINT}/lines/${newline.id}`,
    token: accessToken,
    bodyContent: {
      name: newline.name,
      color: newline.color,
    }
  });
  if (!response.ok) {
    throw new Error('역 수정 실패');
  }

  return newline;
};
