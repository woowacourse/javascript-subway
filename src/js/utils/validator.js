// eslint-disable-next-line import/prefer-default-export
export const isLengthInRange = (target, min, max) => {
  if (typeof target !== "string" && !Array.isArray(target)) {
    throw new TypeError("Invalid target");
  }

  if (!(typeof min === "number" && typeof max === "number") || min > max) {
    throw new TypeError("Invalid range");
  }

  return target.length >= min && target.length <= max;
};
