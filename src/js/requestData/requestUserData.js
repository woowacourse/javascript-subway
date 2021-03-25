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
  } catch (error) {
    throw new Error('이미 존재하는 역입니다.');
  }
};
