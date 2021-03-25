import { SESSION_STORAGE_KEY } from '../constants.js';
import { sessionStore } from '../utils/utils.js';

export const requestLineRegistration = async line => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${API_END_POINT}/lines`, {
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
  const [upStation, downStation] = newLine.stations;
  const processedNewLine = {
    id: Number(newLine.id),
    name: newLine.name,
    color: newLine.color,
    upStationName: upStation.name,
    upStationId: Number(upStation.id),
    downStationName: downStation.name,
    downStationId: Number(downStation.id),
    distance: Number(newLine.distance),
    duration: Number(newLine.duration),
  };

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }

  return processedNewLine;
};

export const requestLineList = async () => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${API_END_POINT}/lines`, {
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
    const [upStation, downStation] = line.stations;
    return {
      id: Number(line.id),
      name: line.name,
      color: line.color,
      upStationName: upStation.name,
      upStationId: Number(upStation.id),
      downStationName: downStation.name,
      downStationId: Number(downStation.id),
      distance: Number(line.distance),
      duration: Number(line.duration),
    };
  });
};

export const requestLineDelete = async lineId => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${API_END_POINT}/lines/${lineId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }
}

// TODO: 노선 API가 duration, distance를 포함하지 않음 => API가 수정되면 요놈을 이용해서 노선 수정 제출 버튼 눌렀을 때 API 요청 보내는 거 구현하기
export const requestLineEdit = async line => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${API_END_POINT}/lines/${line.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name: line.name,
      color: line.color,
      upStationId: line.upStationId,
      downStationId: line.downStationId,
      distance: line.distance,
      duration: line.duration,
    }),
  });

  if (!response.ok) {
    throw new Error('역 수정 실패');
  }
};
