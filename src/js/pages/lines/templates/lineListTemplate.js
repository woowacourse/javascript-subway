function lineItemTemplate({ id, name, color }) {
  return `
  <li class="d-flex items-center line-list-item py-2 relative" data-line-id=${id} data-line-name=${name}>
    <span class="line-color-dot ${color}"></span>
    <span class="w-100 pl-6 line-list-item-name">${name}</span>
    <button
      type="button"
      class="btn bg-gray-50 text-gray-500 text-sm mr-1 js-modify-button"
    >
      수정
    </button>
    <button
      type="button"
      class="btn bg-gray-50 text-gray-500 text-sm js-delete-button"
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

export { lineItemTemplate, lineListTemplate };
