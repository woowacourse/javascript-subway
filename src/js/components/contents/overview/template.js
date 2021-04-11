export const STATION_TEMPLATE = ({ name, distance, duration }) => `
<div>
  <span>${name}</span>
  <span>${distance}km</span>
  <span>${duration}분</span>
</div>
<hr class="w-100">
`;

export const SECTION_LIST_ITEM_TEMPLATE = (lineName, color, sectionList) => `
<li class="d-flex flex-col items-start">
  <div class="d-flex justify-start items-center">
    <input type="color" class="line-color-input" value="${color}" disabled />
    <h3>${lineName}</h3>
  </div>
  <div class="d-flex flex-col">
    ${sectionList.map((station) => STATION_TEMPLATE(station)).join('')}
  </div>
</li>
`;

export const OVERVIEW_TEMPLATE = `
<div class="heading d-flex">
  <h2 class="mt-1 w-100">🗺️ 전체 보기</h2>
</div>
<ul class="mt-3 pl-0 section-list"></ul>
`;
