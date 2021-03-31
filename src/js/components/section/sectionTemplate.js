export const sectionsTemplate = sections => {
  return `
  <div class="wrapper bg-white p-10">
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">🔁 구간 관리</h2>
      <button
        type="button"
        class="create-section-btn modal-trigger-btn bg-cyan-300 ml-2"
      >
        구간 추가
      </button>
    </div>
    <form name="select-section" class="d-flex items-center pl-1">
      <select class="">
        <option value="" selected disabled hidden>관리할 구간에 해당되는 노선을 선택해주세요</option>
        ${Object.keys(sections)
          .map(key => {
            return `<option value=${key}>${sections[key].name}</option>`;
          })
          .join('')}
      </select>
    </form>
    <ul id="section-list" class="mt-3 pl-0">
    </ul>
  </div>`;
};

export const sectionTemplate = ({ id, name }) => {
  return `
    <li class="section-item d-flex items-center py-2 relative" data-section-id=${id}>
    <span class="w-100 pl-6">${name}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm"
    >
      삭제
    </button>
  </li>
  `;
};

export const modalTemplate = (stations, sections) => {
  return `
  <div class="modal-inner p-8">
  <button class="modal-close">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>
  <header>
    <h2 class="text-center">🔁 구간 추가</h2>
  </header>
  <form name="add-section">
    <div class="input-control">
      <select name="line-select">
        <option value="" selected disabled hidden>노선을 선택해주세요</option>
        ${Object.keys(sections)
          .map(key => {
            return `<option value=${key}>${sections[key].name}</option>`;
          })
          .join('')}
      </select>
    </div>
    <div class="d-flex items-center input-control">
      <select name="prev-station" class="select-section-station">
        <option value="" selected disabled hidden>추가할 구간을 선택해 주세요</option>
      </select>
      <div class="d-inline-block mx-3 text-2xl">➡️</div>
      <select name="next-station">
        <option value="" selected disabled hidden>다음역</option>
        ${Object.keys(stations).map(key => {
          return `<option value=${key}>${stations[key].name}</option>`;
        })}
      </select>
    </div>
    <div class="input-control">
      <label for="distance" class="input-label" hidden
        >두 역간의 거리</label
      >
      <input
        type="number"
        id="distance"
        name="distance"
        class="input-field mr-2 optional"
        placeholder="두 역간의 거리"
        required
      />
      <label for="duration" class="input-label" hidden
        >두 역간의 시간</label
      >
      <input
        type="number"
        id="duration"
        name="arrival"
        class="input-field optional"
        placeholder="두 역간의 시간"
        required
      />
    </div>
    <div class="d-flex justify-end mt-3">
      <button
        name="submit"
        class="input-submit bg-cyan-300"
      >
        확인
      </button>
    </div>
  </form>
</div>
  `;
};

export const sectionStationTemplate = sectionStations => {
  return `
  <option value="" selected disabled hidden>추가할 구간을 선택해 주세요</option>
  <option value="-${sectionStations[0].id}">출발역으로 추가</option>
  ${sectionStations.map(({ id, name }) => {
    return `<option value="${id}">${name}</option>`;
  })}
  `;
};
