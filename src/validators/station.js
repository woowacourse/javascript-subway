import { VALIDATION } from '../constants.js';

export const isProperStationNameLength = (stationName) => {
  return stationName.length >= VALIDATION.MIN_STATION_NAME_LENGTH 
  && stationName.length <= VALIDATION.MAX_STATION_NAME_LENGTH
}

export const isDuplicatedStationNameExist = (stationName, stationList) => {
  return stationList.some(station => station.name === stationName);
}
