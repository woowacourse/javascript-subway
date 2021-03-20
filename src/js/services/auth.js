import httpClient from '../api/httpClient';
import { ALERT_MESSAGE } from '../constants';

export const requestSignup = async ({ email, password, name }) => {
  try {
    const response = await httpClient.post('/members', { email, password, name });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: ALERT_MESSAGE.SIGNUP_FAILED,
    };
  }
};

export const requestLogin = async ({ email, password }) => {
  try {
    const response = await httpClient.post('/login/token', { email, password });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      accessToken: data.accessToken,
    };
  } catch (error) {
    return {
      success: false,
      message: ALERT_MESSAGE.LOGIN_FAILED,
    };
  }
};

export const requestCheckLogin = async () => {
  try {
    const response = await httpClient.get('/members/me');

    if (!response.ok) return false;

    return true;
  } catch (error) {
    return false;
  }
};
