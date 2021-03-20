import { BASE_URL } from '../constants/constants';

export const getUserName = async accessToken => {
  const url = `${BASE_URL}/members/me`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const { name } = await response.json();

  return name;
};
