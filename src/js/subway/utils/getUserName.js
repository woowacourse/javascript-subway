import { BASE_URL } from '../constants/constants';
import { request } from '../../@shared/utils';

export const getUserName = async accessToken => {
  const url = `${BASE_URL}/members/me`;
  const option = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await request(url, option);
    const { name: userName } = await response.json();

    return userName;
  } catch (error) {
    throw new Error(error.message);
  }
};
