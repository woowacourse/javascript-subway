import { regExpForHexCode } from '../../../utils/index.js';

const OVERVIEW_STATION_TEMPLATE = (stationName, lineColor) => `
  <li class="overview-station-item" style="background-color: ${lineColor};">
    <span class="overview-station-name"">${stationName}</span>
  </li>
`;

export const OVERVIEW_ITEM_TEMPLATE = ({ name: lineName, stations, color }) => {
  const colorTested = regExpForHexCode.test(color) ? color : '#666666';
  return `
  <li class="overview-line-item">
    <h2 class="overview-line-title" style="border-color: ${colorTested};">
      ${lineName}
    </h2>
    <ul class="overview-station-list">
      ${stations.map((station) => OVERVIEW_STATION_TEMPLATE(station.name, colorTested)).join('')}
    </ul>
  </li>
  `;
};

export const OVERVIEW_TEMPLATE = `
<div class="heading d-flex">
  <h2 class="mt-1 w-100">🗺️ 전체 보기</h2>
</div>
<ul class="overview-line-list pl-0">
</ul>
`;
