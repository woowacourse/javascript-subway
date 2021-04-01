export const LINE_OPTION_TEMPLATE = (lineList) =>
  lineList.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');

export const STATION_OPTION_TEMPLATE = (stationList) => {
  const headOption = `<option value="" selected disabled hidden>역 선택</option>`;
  const bodyOptions = stationList.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');

  return `${headOption}${bodyOptions}`;
};

export const STATION_OF_LINE_TEMPLATE = ({ id: stationId, name: stationName, distance, duration }, lineId) => `
<li class="station-list-item d-flex items-center py-2">
  <span class="w-100 pl-2">${stationName}</span>
  <span class="distance">${distance} km</span>
  <span class="duration">${duration} 분</span>
  <i class="remove-button fas fa-trash-alt" data-line-id=${lineId} data-station-id=${stationId}></i>
</li>
<li class="station-list-item d-flex items-center py-2">
  <i class="plus-button fas fa-plus-circle" data-station-id=${stationId}></i>
</li>
`;

export const SECTIONS_TEMPLATE = `
<div class="heading d-flex">
  <h2 class="mt-1 w-100">🔁 구간 관리</h2>
</div>
  <div class="input-control">
    <label for="line-select" class="input-label v-hidden">노선</label>
    <select id="line-select"></select>
  </div>
<ul class="mt-3 pl-0">
</ul>
<form id="add-form" class="section-add-form v-hidden" data-line-id="" data-up-station-id="" data-down-station-id="">
  <label for="station-select" class="input-label v-hidden">역 선택</label>
  <select id="station-select" name="id" required></select>
  <i class="undo-button fas fa-undo"></i>
  <i class="check-button fas fa-check-circle"></i>
  <label for="distance" class="input-label">전역-현재역 거리</label>
  <input type="number" id="distance" class="distance" name="distance" step="1" min="1" required />
  <label for="duration" class="input-label">전역-추가역 시간</label>
  <input type="number" id="duration" class="duration" name="duration" step="1" min="1" required />
</form>
`;
