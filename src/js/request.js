import { HOST } from './constants/constants.js';

export const signupRequest = async (data) => {
  const url = `${HOST}/members`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response;
};

export const loginRequest = async (data) => {
  const url = `${HOST}/login/token`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response.json();
};

export const userInfoRequest = async (token) => {
  const url = `${HOST}/members/me`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response.json();
};

export const checkEmailDuplicatedRequest = async (email) => {
  const url = `${HOST}/members/check-validation?`;
  const searchParams = new URLSearchParams();

  searchParams.set('email', email);

  const requestURL = url + searchParams;
  const response = await fetch(requestURL);

  if (!response.ok) {
    throw new Error(res.status);
  }

  return response;
};
