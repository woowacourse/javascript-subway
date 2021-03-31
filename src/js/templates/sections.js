export const getLineOptionsTemplate = (lineData) => {
  return lineData.map((line) => `<option class="bg-white">${line.name}</option>`).join('');
};

const getSectionListItemTemplate = (stationName) => `
  <li class="section-list-item">
    <div class="d-flex items-center py-2">
      <span class="w-100 pl-6">${stationName}</span>
      <button type="button" class="section-list-item__remove-button bg-gray-50 text-gray-500 text-sm" data-station-name="${stationName}">삭제</button>
    </div>
    <hr class="my-0" />
  </li>
`;

export const getTargetSectionListTemplate = (stationNames) => {
  return stationNames.map((stationName) => getSectionListItemTemplate(stationName)).join('');
};

export const getStationOptionsTemplate = (stationData) => {
  const stationOptionsTemplate = stationData.map((station) => `<option>${station.name}</option>`).join('');

  return `
    <label for="up-station" class="input-label" hidden>상행역</label>
    <select id="up-station">
      <option value="" selected disabled hidden>상행역</option>
        ${stationOptionsTemplate}
    </select>
    <div class="d-inline-block mx-3 text-2xl">➡️</div>
    <label for="down-station" class="input-label" hidden>하행역</label>
    <select id="down-station">
      <option value="" selected disabled hidden>하행역</option>
        ${stationOptionsTemplate}
    </select>
`;
};

export const getSectionsTemplate = () => `
  <div class="wrapper bg-white p-10">
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">🔁 구간 관리</h2>
      <button type="button" class="create-section-button modal-trigger-btn bg-cyan-300 ml-2">등록</button>
    </div>
    <form class="d-flex items-center pl-1">
    <label for="subway-line" class="input-label" hidden>노선</label>
      <select id="subway-line" class="bg-gray-50 line-options-wrapper"></select>
    </form>
    <ul class="line-list-wrapper mt-3 pl-0"></ul>
  </div>
  <div class="modal">
    <div class="modal-inner p-8">
      <button class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
      <header>
        <h2 class="text-center">🔁 확인</h2>
      </header>
      <form class="modal__section-form">
        <div class="input-control">
          <label for="subway-line-for-section" class="input-label" hidden>노선</label>
          <select id="subway-line-for-section" class="modal__line-options-wrapper"></select>
        </div>
        <div class="modal__station-options-wrapper d-flex items-center input-control"></div>
        <div class="input-control">
        <label for="distance" class="input-label" hidden>상행 하행역 거리</label>
        <input
          type="number"
          id="distance"
          name="distance"
          class="modal_line-distance input-field mr-2"
          placeholder="상행 하행역 거리"
          required
        />
        <label for="duration" class="input-label" hidden>상행 하행역 시간</label>
        <input
          type="number"
          id="duration"
          name="arrival"
          class="modal_line-duration input-field"
          placeholder="상행 하행역 시간"
          required
        />
      </div>
        <div class="d-flex justify-end mt-3">
          <button
            type="submit"
            name="submit"
            class="input-submit bg-cyan-300"
          >
            확인
          </button>
        </div>
      </form>
    </div>
  </div>
`;
