export const stationListTemplate = (station) => {
  return `<li class="station-list-item d-flex items-center py-2 bottom-line">
            <span class="station-name w-100 pl-2" data-id=${station.id}>${station.name}</span>
            <button type="button" class="station-edit-button bg-gray-50 text-gray-500 text-sm mr-1" data-id=${station.id}>
              수정
            </button>
            <button type="button" class="station-delete-button bg-gray-50 text-gray-500 text-sm" data-id=${station.id}>
              삭제
            </button>
          </li>`;
};

export const stationsTemplate = (stationList) => {
  return `
    <div class="stations-container container wrapper bg-white p-10">
        <div class="heading">
          <h2 class="mt-1">🚉 역 관리</h2>
        </div>
        <form id="station-input-form">
          <div class="d-flex w-100">
            <label for="station-name" class="input-label" hidden>
              역 이름
            </label>
            <input
              type="text"
              id="station-name-input"
              name="station-name"
              class="input-field"
              placeholder="역 이름"
              required
            />
            <button
              type="submit"
              name="submit"
              class="input-submit bg-cyan-300 ml-2"
            >
              확인
            </button>
          </div>
        </form>
        <ul id="station-list-container" class="mt-3 pl-0">
          ${stationList.map((station) => stationListTemplate(station)).join('')}
        </ul>
      </div>
      <div id="station-edit-modal" class="modal">
        <div class="modal-inner p-8">
          <button id="modal-close-button" class="modal-close">
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <header>
            <h2 class="text-center">📝 역 이름 변경</h2>
          </header>
          <form>
            <div class="input-control">
              <label for="station-edit-name" class="input-label" hidden
                >노선 이름</label
              >
              <input
                type="text"
                id="station-edit-name-input"
                name="station-edit-name"
                class="input-field"
                placeholder=""
                required
              />
            </div>
            <div class="d-flex justify-end mt-3">
              <button type="submit" name="submit" class="input-submit bg-cyan-300">
                확인
              </button>
            </div>
          </form>
        </div>
       </div>`;
};
