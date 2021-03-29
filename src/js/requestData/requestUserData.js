import { ERROR_MESSAGE } from '../utils/constants';
import { httpClient } from '../api/httpClient';

export const requestEmailDuplicationCheck = async (email) => {
  try {
    const response = await httpClient.get(`/members/check-validation?email=${email}`);

    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_EMAIL);
  }
};

export const requestGetToken = async ({ email, password }) => {
  try {
    const response = await httpClient.post('/login/token', { email, password });
    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    return data.accessToken;
  } catch (error) {
    throw new Error(ERROR_MESSAGE.SIGN_IN_FAIL);
  }
};

export const requestSignUpApprove = async ({ email, name, password }) => {
  try {
    const response = await httpClient.post('/members', { email, password, name });

    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(ERROR_MESSAGE.SIGN_UP_FAIL);
  }
};

export const requestAddLine = async ({ name, color, upStationId, downStationId, distance, duration }) => {
  try {
    const response = await httpClient.post({
      path: '/lines',
      body: { name, color, upStationId, downStationId, distance, duration },
      accessToken: token.accessToken,
    });
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    throw new Error('노선 생성에 실패했습니다.');
  }
};

export const requestGetLineList = async () => {
  try {
    const response = await httpClient.get({ path: `/lines`, accessToken: token.accessToken });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    throw new Error('노선 목록 조회에 실패했습니다.');
  }
};
