const lineListItem = ({ id, color, name }) => {
  return `
    <li class="js-line-item d-flex items-center py-2 relative" data-id="${id}">
      <span class="subway-line-color-dot bg-${color}"></span>
      <span class="w-100 pl-6 subway-line-list-item-name">${name}</span>
      <button
        type="button"
        class="js-line-item__edit bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
      <button
        type="button"
        class="js-line-item__delete bg-gray-50 text-gray-500 text-sm">삭제</button>
    </li>
  `;
};

const mainTemplate = ({ state: { lines } }) => {
  return `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex">
        <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
        <button
          type="button"
          class="js-line-item__create create-line-btn bg-cyan-300 ml-2"
        >노선 추가</button>
      </div>
      <ul class="js-line-list mt-3 pl-0">
        ${lines.map(lineListItem).join('')}
      </ul>
    </div>
  `;
};

export default mainTemplate;
