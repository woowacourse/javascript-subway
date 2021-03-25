export const deepFreeze = (target) => {
  if (!target) {
    return;
  }

  if (typeof target === 'object' && !Object.isFrozen(target)) {
    Object.freeze(target);
    Object.keys(target).forEach((key) => deepFreeze(target[key]));
  }

  return target;
};
