import { API_ENDPOINT } from '../constants/index.js';
import { toStringFromFormData } from './form.js';

const headers = {
  'Content-Type': 'application/json; charset=UTF-8',
};

export const fetchEmailValidation = async (email) => {
  const url = new URL(API_ENDPOINT.EMAIL_VALIDATION);
  const parameters = new URLSearchParams({ email });

  url.search = parameters.toString();

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  return response;
};

export const fetchSignUp = async (formData) => {
  const response = await fetch(API_ENDPOINT.SIGN_UP, {
    method: 'POST',
    headers,
    body: toStringFromFormData(formData),
  });

  return response;
};

export const fetchLogin = async (formData) => {
  const response = await fetch(API_ENDPOINT.LOGIN, {
    method: 'POST',
    headers,
    body: toStringFromFormData(formData),
  });

  return response;
};
