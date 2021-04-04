const isElement = target => {
  return target.nodeType && [1, 9].includes(target.nodeType);
};

export const $ = (selector, target = document) => {
  if (typeof selector !== 'string' || !isElement(target)) return;

  const all = target.querySelectorAll(selector);
  return all.length > 1 ? [...all] : all[0];
};

export const sessionStore = {
  setItem(key, item) {
    if (key && typeof key !== 'string') return;

    sessionStorage.setItem(key, JSON.stringify(item));
  },
  getItem(key) {
    if (key && typeof key !== 'string') return;
    const item = sessionStorage.getItem(key);
    const parsedItem = JSON.parse(item);

    return parsedItem ? parsedItem : item;
  },
  removeItem(key) {
    if (key && typeof key !== 'string') return;

    sessionStorage.removeItem(key);
  },
};

export const isObject = obj => {
  const type = typeof obj;
  return type !== 'function' && type === 'object' && !!obj;
};
