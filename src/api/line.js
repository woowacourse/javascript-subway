import { URL } from '../constants.js';
import { sendGetRequest, sendPostRequest, sendPutRequest, sendDeleteRequest } from '../utils/api.js';

export const requestLineRegistration = async line => {
  const response = await sendPostRequest(`${URL.BASE_URL}/lines`, {
    name: line.name,
    color: line.color,
    upStationId: Number(line.upStationId),
    downStationId: Number(line.downStationId),
    distance: Number(line.distance),
    duration: Number(line.duration),
  });

  if (response.isTokenInvalid) return;
  
  const newLine = await response.json();
  const processedNewLine = {
    id: Number(newLine.id),
    name: newLine.name,
    color: newLine.color,
    stations: newLine.stations,
    sections: newLine.sections,
  };

  if (!response.ok) throw new Error('역 등록 실패');
  
  
  return processedNewLine;
};

export const requestLineList = async () => {
  const response = await sendGetRequest(`${URL.BASE_URL}/lines`);
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
  const response = await sendDeleteRequest(`${URL.BASE_URL}/lines/${lineId}`);
  if (response.isTokenInvalid) return;

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }
}

export const requestLineUpdate = async (newline) => {
  const response = await sendPutRequest(`${URL.BASE_URL}/lines/${newline.id}`, {
    name: newline.name,
    color: newline.color,
  });
  if (response.isTokenInvalid) return;

  if (!response.ok) {
    throw new Error(response.status);
  }

  return newline;
};
