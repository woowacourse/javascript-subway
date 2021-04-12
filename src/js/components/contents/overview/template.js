export const STATION_TEMPLATE = ({ name, distance, duration }, color) => `
<div class="d-flex flex-col station-infos">
  <div class="d-flex justify-center items-center">
    <span class="d-flex flex-col justify-center items-center w-30 text-center text-base">${name}</span>
  </div>
  <div class="d-flex justify-end items-center w-50  additional-infos">
    <span class="direction-line" style="background-color: ${color}"></span>
    <span class="flex-basis-25 mx-2 text-right text-lg distance">${distance}km</span>
    <span class="flex-basis-25 ml-2 text-right text-lg duration">${duration}분</span>
  </div>
</div>
`;

export const SECTION_LIST_ITEM_TEMPLATE = ({ name: lineName, color, distance, duration, sectionList }) => `
<li class="d-flex flex-col items-start">
  <div class="d-flex items-center w-100 -mb-5">
    <input type="color" class="line-color-input mr-2" value="${color}" disabled />
    <h3>${lineName}</h3>
    <span class="ml-auto text-right flex-basis-12 mx-2 text-xl distance">총 ${distance}km</span>
    <span class="text-right flex-basis-12 ml-2 text-xl duration">총 ${duration}분</span>
  </div>
  <div class="d-flex flex-col w-100 my-2">
    ${sectionList.map((station) => STATION_TEMPLATE(station, color)).join('')}
  </div>
  <hr class="w-100">
</li>
`;

export const OVERVIEW_TEMPLATE = `
<div class="heading d-flex">
  <h2 class="mt-1 w-100">🗺️ 전체 보기</h2>
</div>
<ul class="mt-3 pl-0 section-list"></ul>
`;
