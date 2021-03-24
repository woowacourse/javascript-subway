import { BASE_URL, HTTP } from '../constants/api.js';

async function fetchSignup({ email, name, password }) {
  const requestData = {
    method: HTTP.METHOD.POST,
    body: JSON.stringify({
      email,
      name,
      password,
    }),
    headers: {
      [HTTP.HEADERS.KEY
        .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
    },
  };

  return await fetch(`${BASE_URL}/members`, requestData);
}

async function fetchLogin({ email, password }) {
  const requestData = {
    method: HTTP.METHOD.POST,
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      [HTTP.HEADERS.KEY
        .CONTENT_TYPE]: `${HTTP.HEADERS.VALUE.APPLICATION_JSON}; ${HTTP.HEADERS.VALUE.CHARSET_UTF_8}`,
    },
  };

  return await fetch(`${BASE_URL}/login/token`, requestData);
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
