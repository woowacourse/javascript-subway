import httpClient from '../api/httpClient';
import { ALERT_MESSAGE } from '../constants';

export const signup = async ({ email, password, name }) => {
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
    // NOTE: 현재는 API 서버에서 세부적인 에러 메세지가 전달되지 않아 '회원가입에 실패했습니다'만 전달.
    return {
      success: false,
      message: error.message || ALERT_MESSAGE.SIGNUP_FAILED,
    };
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await httpClient.post('/login/token', { email, password });
    const data = await response.json();

    return {
      success: true,
      accessToken: data.accessToken,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || ALERT_MESSAGE.SIGNUP_FAILED,
    };
  }
};

export const checkLogin = async () => {
  try {
    const response = await httpClient.get('/members/me');

    if (!response.ok) return false;

    return true;
  } catch (error) {
    return false;
  }
};
