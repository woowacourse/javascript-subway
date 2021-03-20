export const getFromSessionStorage = key => {
  try {
    return JSON.parse(sessionStorage.getItem(key));
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const getCircularReplacer = () => {
  const seen = new WeakSet();

  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }

    return value;
  };
};

export const setToSessionStorage = (key, value) => {
  const JSONstring = JSON.stringify(value, getCircularReplacer());

  if (!JSONstring) {
    throw new Error('JSON stringify error.');
  }

  sessionStorage.setItem(key, JSONstring);
};
