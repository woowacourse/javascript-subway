function stationItemTemplate({ id, name }) {
  return `
    <li class="station-list-item d-flex items-center py-2" data-station-id=${id} data-station-name=${name}>
      <span class="w-100 pl-2">${name}</span>
      <button
        type="button"
        class="js-modify-button btn bg-gray-50 text-gray-500 text-sm mr-1"
      >
        수정
      </button>
      <button
        type="button"
        class="js-delete-button btn bg-gray-50 text-gray-500 text-sm"
      >
        삭제
      </button>
    </li>`;
}

function stationListTemplate(stations) {
  return Object.values(stations)
    .map(station => stationItemTemplate(station))
    .join('');
}

function modifyStationTemplate(staionName) {
  return `
  <form class="w-100">
    <div class="d-flex flex-between">
      <input name="new-station-name" class="w-100 pl-2" value=${staionName} required/>
      <button
        type="submit"
        class="js-save-modify-button js-save btn bg-gray-50 text-gray-500 text-sm"
      >
        저장
      </button>
    </div>  
  </form>`;
}

export { stationItemTemplate, stationListTemplate, modifyStationTemplate };
