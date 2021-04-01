export const mainTemplate = ({ state: { stations } }) => {
  return `
    <div class="wrapper bg-white p-10">
      <div class="heading">
        <h2 class="mt-1">🚉 역 관리</h2>
      </div>
      <form id="create-station-form">
        <div class="d-flex w-100">
          <label for="station-name" class="input-label" hidden>
            역 이름
          </label>
          <input
            type="text"
            id="station-name"
            name="station-name"
            class="input-field"
            placeholder="역 이름"
            required
          />
          <button
            name="submit"
            class="input-submit bg-cyan-300 ml-2"
          >
            역 추가
          </button>
        </div>
      </form>
      <ul class="js-station-list mt-3 pl-0">
        ${stations.map(stationListItem).join('')}
      </ul>
    </div>
  `;
};

const stationListItem = ({ id, name }) => {
  return `
    <li class="js-station-item station-list-item d-flex items-center py-2" data-id="${id}">
      <span class="w-100 pl-2">${name}</span>
      <button
        type="button"
        class="js-station-item__edit bg-gray-50 text-gray-500 text-sm mr-1"
      >
        수정
      </button>
      <button
        type="button"
        class="js-station-item__delete bg-gray-50 text-gray-500 text-sm"
      >
        삭제
      </button>
    </li>
  `;
};
