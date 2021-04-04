import { SESSION_STORAGE_KEY, URL } from '../constants.js';
import { sessionStore } from '../utils/utils.js';

export const requestLineRegistration = async line => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${URL.BASE_URL}/lines`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      name: line.name,
      color: line.color,
      upStationId: Number(line.upStationId),
      downStationId: Number(line.downStationId),
      distance: Number(line.distance),
      duration: Number(line.duration),
    }),
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
  const response = await fetch(`${URL.BASE_URL}/lines`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

  const newLineList = await response.json();

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }

  return newLineList.map(line => {
    return {
      id: Number(line.id),
      name: line.name,
      color: line.color,
      stations: line.stations,
      sections: line.sections,    
    };
  });
};

export const requestLineDelete = async lineId => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${URL.BASE_URL}/lines/${lineId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }
}

export const requestLineUpdate = async (newline) => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${URL.BASE_URL}/lines/${newline.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      name: newline.name,
      color: newline.color,
    }),
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return newline;
};
