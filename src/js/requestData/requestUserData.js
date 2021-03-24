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
    const data = await response.json();

    if (!response.ok) {
      throw new Error(response.status);
    }

    return data.accessToken;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestSignUpApprove = async ({ email, name, password }) => {
  try {
    const response = await httpClient.post('/members', { email, password, name });

    if (!response.ok) {
      throw new Error(response.status);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
