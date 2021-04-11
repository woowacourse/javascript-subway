export const getMapTemplate = () => {
  return `
  <div class="wrapper bg-white p-10">
    <div class="heading">
      <h2 class="mt-1">🗺️ 전체 보기</h2>
    </div>
    <div class="subway-map d-flex w-100"></div>
  </div>
`;
};

const liTemplate = (line) => {
  return line.stations
    .map(
      (station) =>
        `<div class="map__between-stations-line ${line.color}">
        </div>
        <li class="map__station-name">
          ${station.name}
        </li>`,
    )
    .join('');
};

export const getLineListMapTemplate = (line) => {
  return `
  <div>
    <ul class="map__wrapper">
      <div class="line-name-wrapper ${line.color}">
        <span class="map__line-name">${line.name}</span>
      </div>
      ${liTemplate(line)}
    </ul>
  </div>
  `;
};
