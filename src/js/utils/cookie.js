export const setCookie = ({ key, value, expireDays }) => {
  const expireDate = new Date();

  expireDate.setDate(expireDate.getDate() + expireDays);
  document.cookie = `${key}=${value}; expires=${expireDate}`;
};
