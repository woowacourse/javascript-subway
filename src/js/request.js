import { HOST } from './constants/constants.js';

export const signupRequest = async (data) => {
  const url = `${HOST}/members`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res;
  });

  return response;
};
