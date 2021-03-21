import { BASE_URL } from '../constants';

async function fetchSignup({ method, body, headers }) {
  return await fetch(`${BASE_URL}/members`, { method, body, headers });
}

async function fetchLogin({ method, body, headers }) {
  return await fetch(`${BASE_URL}/login/token`, { method, body, headers });
}

function getSearchQueryString(targetEmail) {
  const searchQuery = new URLSearchParams({
    email: targetEmail,
  });

  return searchQuery.toString();
}

async function fetchToCheckDuplicatedEmail(targetEmail) {
  return await fetch(
    `${BASE_URL}/members/check-validation?${getSearchQueryString(targetEmail)}`
  );
}

export { fetchSignup, fetchLogin, fetchToCheckDuplicatedEmail };
