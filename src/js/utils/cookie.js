export const setCookie = ({ key, value, expireDays }) => {
  const expireDate = new Date();

  expireDate.setDate(expireDate.getDate() + expireDays);
  document.cookie = `${key}=${value}; expires=${expireDate}`;
};

export const getCookie = (key) => {
  if (!document.cookie) return;

  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(key + '='))
    .split('=')[1];

  return cookieValue;
};
