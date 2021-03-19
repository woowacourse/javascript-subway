import { BASE_URL } from '../constants';

async function fetchSignup({ method, body, headers }) {
  return await fetch(`${BASE_URL}/members`, { method, body, headers });
}

export { fetchSignup };
