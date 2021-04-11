import { ERROR_MESSAGE } from '../utils/constants';
import token from '../token/Token';
import { subwayFetch } from '../api/httpClient';

export const requestEmailDuplicationCheck = async (email) => {
  await subwayFetch(
    'get',
    {
      path: `/members/check-validation?email=${email}`,
    },
    ERROR_MESSAGE.DUPLICATED_EMAIL,
  );
};

export const requestGetToken = async ({ email, password }) => {
  const response = await subwayFetch('post', {
    path: '/login/token',
    body: { email, password },
  });

  return response.accessToken;
};

export const requestSignUpApprove = async ({ email, name, password }) => {
  await subwayFetch('post', { path: '/members', body: { email, password, name } }, ERROR_MESSAGE.SIGN_UP_FAIL);
};

export const requestAddStation = async (stationName) => {
  const response = await subwayFetch('post', {
    path: '/stations',
    body: stationName,
    accessToken: token.accessToken,
  });

  return response;
};

export const requestEditStationName = async ({ id, name }) => {
  await subwayFetch('put', {
    path: `/stations/${id}`,
    body: { name },
    accessToken: token.accessToken,
  });
};

export const requestRemoveStation = async ({ id }) => {
  await subwayFetch('delete', {
    path: `/stations/${id}`,
    accessToken: token.accessToken,
  });
};

export const requestGetStationList = async () => {
  const response = await subwayFetch('get', {
    path: `/stations`,
    accessToken: token.accessToken,
  });
  return response;
};

export const requestAddLine = async ({ name, color, upStationId, downStationId, distance, duration }) => {
  const response = await subwayFetch('post', {
    path: '/lines',
    body: { name, color, upStationId, downStationId, distance, duration },
    accessToken: token.accessToken,
  });
  return response;
};

export const requestGetLineList = async () => {
  const response = await subwayFetch('get', { path: `/lines`, accessToken: token.accessToken });

  return response;
};

export const requestGetTargetLineList = async ({ id }) => {
  const response = await subwayFetch('get', { path: `/lines/${id}`, accessToken: token.accessToken }, true);

  return response;
};

export const requestEditLineData = async ({ id, name, color }) => {
  await subwayFetch('put', { path: `/lines/${id}`, body: { name, color }, accessToken: token.accessToken });
};

export const requestRemoveLine = async ({ id }) => {
  await subwayFetch('delete', { path: `/lines/${id}`, accessToken: token.accessToken });
};

export const requestAddSection = async ({ id, upStationId, downStationId, distance, duration }) => {
  await subwayFetch('post', {
    path: `/lines/${id}/sections`,
    body: { upStationId, downStationId, distance, duration },
    accessToken: token.accessToken,
  });
};

export const requestRemoveSection = async ({ lineId, stationId }) => {
  await subwayFetch('delete', {
    path: `/lines/${lineId}/sections?stationId=${stationId}`,
    accessToken: token.accessToken,
  });
};
