import httpClient from '../api/httpClient';
import { AUTH } from '../constants/alertMessage';

export const requestSignup = async ({ email, password, name }) => {
  try {
    const response = await httpClient.post('/members', { email, password, name });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message ?? AUTH.SIGNUP_FAILED,
    };
  }
};

export const requestLogin = async ({ email, password }) => {
  try {
    const response = await httpClient.post('/login/token', { email, password });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return {
      success: true,
      accessToken: data.accessToken,
    };
  } catch (error) {
    return {
      success: false,
      message: AUTH.LOGIN_FAILED,
    };
  }
};

export const requestCheckLogin = async () => {
  try {
    const response = await httpClient.get('/members/me');

    return response.ok;
  } catch (error) {
    return false;
  }
};

export const requestCheckEmail = async email => {
  if (!email) return false;

  try {
    const response = await httpClient.get(`/members/check-validation?email=${email}`);

    return response.ok;
  } catch (error) {
    return false;
  }
};
