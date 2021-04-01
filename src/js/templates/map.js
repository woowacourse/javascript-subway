const getDistanceAndDurationTemplate = (distanceAndDuration) => {
  return distanceAndDuration
    ? `<span class="section-info">${distanceAndDuration.distance}km/${distanceAndDuration.duration}분</span>`
    : '';
};

const getMapStationTemplate = (stationData, lineColor, sectionData) => {
  const distanceAndDuration = sectionData.map((section) => ({
    distance: section.distance,
    duration: section.duration,
  }));

  return stationData
    .map(
      (station, i) =>
        `<li class="station-list">
        ${getDistanceAndDurationTemplate(distanceAndDuration[i])}
          <span class="map-station-name">${station.name}</span>
          <div class="section-line ${lineColor}"></div>
        </li>`,
    )
    .join('');
};

export const getMapLineTemplate = (lineData) => {
  return lineData
    .map(
      (line) => `
    <ul>
      <span class="map-line-name ${line.color}">${line.name}</span>
      ${getMapStationTemplate(line.stations, line.color, line.sections)}
      <span class="map-line-name ${line.color}">${line.name}</span>
    </ul>
  `,
    )
    .join('');
};

export const getMapTemplate = () => `
  <div class="map-wrapper"></div>
`;
