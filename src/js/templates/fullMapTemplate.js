import { CLASS_SELECTOR, ID_SELECTOR } from '../constants';

const FULL_MAP_CREATING_LINE_TEMPLATE = line => {
  const { name, stations, color } = line;

  return `
  <li class="${CLASS_SELECTOR.FULL_MAP_LINE_ITEM}">
    <h2 class="${CLASS_SELECTOR.FULL_MAP_LINE_TITLE} bg-${color}">${name}</h2>
    <ul class="${CLASS_SELECTOR.FULL_MAP_STATION_LIST}">
      ${stations
        .map(station => FULL_MAP_CREATING_STATION_TEMPLATE(station.name, color))
        .join('')}
    </ul>
  </li>
  `;
};

const FULL_MAP_CREATING_STATION_TEMPLATE = (stationName, color) => `
  <li class="${CLASS_SELECTOR.FULL_MAP_STATION_ITEM} bg-${color}">
    <span class="${CLASS_SELECTOR.FULL_MAP_STATION_NAME}">${stationName}</span>
  </li>
`;

const MAIN_COMPONENT = `
<main class="mt-10 d-flex justify-center">
  <div class="wrapper bg-white p-10">
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">🗺 전체 보기</h2>
    </div>
    <ul id="${ID_SELECTOR.FULL_MAP_LINE_LIST}" class="pl-0">
      <li>
      </li>
    </ul>
  </div>
</main>`;

const FULL_MAP_TEMPLATE = {
  TITLE: `🗺 전체 보기`,
  MAIN: MAIN_COMPONENT,
};

export { FULL_MAP_TEMPLATE, FULL_MAP_CREATING_LINE_TEMPLATE };
