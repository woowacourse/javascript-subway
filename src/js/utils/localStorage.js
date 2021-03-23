export const getLocalStorageItem = ({ key, defaultValue = '' }) => {
  const storedData = localStorage.getItem(key);

  if (!storedData) {
    return defaultValue;
  }

  try {
    return JSON.parse(storedData);
  } catch {
    console.error('Stored data is not JSON format.');
    return '';
  }
};

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const setLocalStorageItem = ({ key, item }) => {
  const data = JSON.stringify(item, getCircularReplacer());

  if (data === undefined) {
    console.error("Item type doesn't match with JSON");
    return;
  }

  localStorage.setItem(key, data);
};
