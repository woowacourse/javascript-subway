export const setItemToSessionStorage = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};

export const getItemToSessionStorage = key => {
  try {
    return JSON.parse(sessionStorage.getItem(key));
  } catch (err) {
    console.error(err);
  }
};
