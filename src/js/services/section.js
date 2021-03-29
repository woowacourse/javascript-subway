import store from '../store';

export const getAvailableStations = lineId => {
  const stations = store.station.get();
  const lineStations = store.line.getLineStations(lineId);

  return stations.filter(station => !lineStations.find(lineStation => lineStation.id === station.id));
};

export const getSections = lineId => {
  const stations = store.line.getLineStations(lineId);
  const sections = store.line.getLineSections(lineId);

  return [...sections, { upStation: stations[stations.length - 1] }];
};
