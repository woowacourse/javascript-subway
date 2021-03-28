import { ERROR_MESSAGE } from '../utils/constants';
import { httpClient } from '../api/httpClient';
import token from '../token/Token';

export const requestEmailDuplicationCheck = async (email) => {
  try {
    const response = await httpClient.get({ path: `/members/check-validation?email=${email}` });

    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_EMAIL);
  }
};

export const requestGetToken = async ({ email, password }) => {
  try {
    const response = await httpClient.post({ path: '/login/token', body: { email, password } });
    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();

    return data.accessToken;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestSignUpApprove = async ({ email, name, password }) => {
  try {
    const response = await httpClient.post({ path: '/members', body: { email, password, name } });

    if (!response.ok) {
      throw new Error(response.status);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestAddStation = async ({ name }) => {
  try {
    const response = await httpClient.post({ path: '/stations', body: { name }, accessToken: token.accessToken });
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    throw new Error('이미 존재하는 역입니다.');
  }
};

export const requestEditStationName = async ({ id, name }) => {
  try {
    const response = await httpClient.put({ path: `/stations/${id}`, body: { name }, accessToken: token.accessToken });
    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    throw new Error('역 이름 수정에 실패했습니다.');
  }
};

export const requestRemoveStation = async ({ id }) => {
  try {
    const response = await httpClient.delete({ path: `/stations/${id}`, accessToken: token.accessToken });
    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    throw new Error('역 삭제에 실패했습니다.');
  }
};

export const requestGetStationList = async () => {
  try {
    const response = await httpClient.get({ path: `/stations`, accessToken: token.accessToken });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    throw new Error('역 목록 조회에 실패했습니다.');
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
    console.dir(error);
    throw new Error('노선 생성에 실패했습니다.');
  }
};
