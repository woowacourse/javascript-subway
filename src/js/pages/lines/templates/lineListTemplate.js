function lineItemTemplate({ id, name, color }) {
  return `
  <li class="d-flex items-center py-2 relative" data-line-id=${id} data-line-name=${name}>
    <span class="line-color-dot ${color}"></span>
    <span class="w-100 pl-6 line-list-item-name">${name}</span>
    <button
      type="button"
      class="btn bg-gray-50 text-gray-500 text-sm mr-1"
    >
      수정
    </button>
    <button
      type="button"
      class="btn bg-gray-50 text-gray-500 text-sm"
    >
      삭제
    </button>
  </li>`;
}

function lineListTemplate(lines) {
  return Object.values(lines)
    .map(line =>
      lineItemTemplate({ id: line.id, name: line.name, color: line.color })
    )
    .join('');
}

function modifyLineTemplate(staionName) {
  return `
  <form class="w-100">
    <div class="d-flex flex-between">
      <input name="new-station-name" class="w-100 pl-2" value=${lineName} required/>
      <button
        type="submit"
        class="js-save-modify-button js-save btn bg-gray-50 text-gray-500 text-sm"
      >
        저장
      </button>
    </div>  
  </form>`;
}

export { lineItemTemplate, lineListTemplate, modifyLineTemplate };
