import { encrypt, request } from '../../../@shared/utils';
import { BASE_URL } from '../../constants';

const signIn = async ({ $email, $password }) => {
  const url = `${BASE_URL}/login/token`;
  const option = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: $email.value,
      password: encrypt($password.value),
    }),
  };

  try {
    const response = await request(url, option);

    if (!response.ok) throw new Error(await response.text());

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

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

export const userAuthAPI = { signIn, getUserName };
