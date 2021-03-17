export const requestLoginToken = async (email, password) => {
  const response = await fetch(`${API_END_POINT}/login/token`, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ email, password }),
  });
  console.log(response);
};
