export const getCookie = (key) => {
  const cookie =
    document.cookie &&
    document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${key}=`))
      .split('=')[1];

  return cookie;
};

export const setCookie = ({ key, value = '', minutes }) => {
  let expires = '';
  if (minutes) {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${key}=${value}${expires};`;
};

export const removeCookie = (key) => {
  document.cookie = `${key}=; Max-Age=-99999999;`;
};
