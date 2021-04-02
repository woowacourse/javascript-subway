import store from '../store';

export const getAvailableStations = lineId => {
  const stations = store.station.get();
  const lineStations = store.line.getLineStations(lineId);

  return stations.filter(station => !lineStations.find(lineStation => lineStation.id === station.id));
};

export const getSections = (lineId, { isContainsStartSection } = { isContainsStartSection: true }) => {
  const stations = store.line.getLineStations(lineId);
  const sections = store.line.getLineSections(lineId);

  const startSection = {
    downStation: sections.find(({ upStation }) => upStation.id === stations[0].id).upStation,
  };

  const endSection = {
    upStation: sections.find(({ downStation }) => downStation.id === stations[stations.length - 1].id).downStation,
  };

  const restSections = stations.map((station, index) =>
    index === stations.length - 1 ? endSection : sections.find(({ upStation }) => upStation.id === station.id)
  );

  return isContainsStartSection ? [startSection, ...restSections] : [...restSections];
};
