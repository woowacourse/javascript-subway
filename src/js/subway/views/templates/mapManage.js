import { MENU } from '../../constants';

export const mapInfo = stations => {
  return stations
    .map(station => {
      return `
      <li class="js-station-list-item d-flex items-center py-2 my-2">
        <span class="js-station-name w-100 pl-2">${station.name}</span>
      </li>
      `;
    })
    .join('');
};

export const mapList = lines => {
  return lines
    .map(
      line =>
        `<li>
            <span class="d-flex items-center">${line.name}</span>
            <ul id="map-list" class="${line.color}">
              ${mapInfo(line.stations)}
            </ul>
        </li>`
    )
    .join('');
};

export const mapManage = `
    <div id="main-content" class="manage wrapper bg-white p-10">
        <div class="heading d-flex">
            <h2 class="mt-1 w-100">${MENU.MAP}</h2>
        </div>
        <ul id="total-line-list"></ul>
    </div>
`;
