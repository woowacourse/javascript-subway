import { CLASS_SELECTOR, ID_SELECTOR } from '../constants';

const MAIN_COMPONENT = `
<main class="mt-10 d-flex justify-center">
  <div class="wrapper bg-white p-10">
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">🗺️ 전체 보기</h2>
    </div>
    <div id="${ID_SELECTOR.FULL_MAP_LINE_LIST}">
    </div>
  </div>
  </main>
`;

const makeLineTemplate = (lineName, stations) => {
  const stationsTemplate = `
  <ul class="${CLASS_SELECTOR.FULL_MAP_LINE} full-map-line">
  ${stations.map(station => makeStationTemplate(station.name)).join('')}
  </ul>
  `;

  return `
  <section>
    <div>
      <h3>🚉 ${lineName} 역</h3>
    </div>
    ${stationsTemplate}
  </section>
  `;
};

const makeStationTemplate = stationName => {
  return `<li class="${CLASS_SELECTOR.FULL_MAP_LINE_STATION} full-map-line__station">${stationName}</li>`;
};

const FULL_MAP_TEMPLATE = {
  TITLE: '🗺️ 전체 보기',
  MAIN: MAIN_COMPONENT,
  makeLineTemplate,
};

export default FULL_MAP_TEMPLATE;
