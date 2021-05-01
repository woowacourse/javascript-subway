import { VALIDATION } from '../constants.js';

export const isProperLineNameLength = lineName => {
  return lineName.length >= VALIDATION.MIN_LINE_NAME_LENGTH && lineName.length <= VALIDATION.MAX_LINE_NAME_LENGTH;
};

export const isDuplicatedLineNameExist = (lineName, lineList) => {
  return lineList.some(line => line.name === lineName);
};
