import store from '../store';

export const isStationInLines = stationId => {
  const stationIds = store.line
    .get()
    .flatMap(line => line.stations)
    .map(station => station.id);

  return [...new Set(stationIds)].includes(stationId);
};
