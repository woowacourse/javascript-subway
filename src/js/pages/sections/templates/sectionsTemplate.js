function sectionsTemplate(allLines = {}) {
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

    <form id="sections-line-form" class="d-flex items-center pl-1">
    <label for="line-name" class="input-label" hidden>노선 이름</label>
      <select id="line-name">
      <option value="" selected disabled hidden>노선 선택</option>
        ${Object.values(allLines)
          .map(
            line =>
              `<option value=${line.id} data-line-color="${line.color}" class="bg-white">${line.name}</option>`
          )
          .join('')}
      </select>
    </form>
    <ul id="section-list" class="mt-3 pl-0"></ul>
  </div>
  
  <div id="sections-modal" class="modal"></div>`;
}

function sectionsModalTemplate(allLines = {}, allStations = {}) {
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
      <form id="sections-form">
        <div class="input-control">
          <label for="line-for-section" class="input-label" hidden
            >노선</label
          >
          <select id="line-for-section">
          <option value="" selected disabled hidden>노선 선택</option>
          ${Object.values(allLines)
            .map(line => `<option value=${line.id}>${line.name}</option>`)
            .join('')}
          </select>
        </div>
        <div class="d-flex items-center mb-5">
          <label for="up-station" class="input-label" hidden>상행역</label>
          <select id="up-station">
            <option value="" selected disabled hidden>상행역</option>
            ${Object.values(allStations)
              .map(
                station =>
                  `<option value=${station.id}>${station.name}</option>`
              )
              .join('')}
          </select>
          <div class="d-inline-block mx-3 text-2xl">➡️</div>
          <label for="down-station" class="input-label" hidden
            >하행역</label
          >
          <select id="down-station">
            <option value="" selected disabled hidden>하행역</option>
            ${Object.values(allStations)
              .map(
                station =>
                  `<option value=${station.id}>${station.name}</option>`
              )
              .join('')}
          </select>
        </div>

        <div class="d-flex mb-5">
          <label for="distance" class="input-label" hidden>상행 하행역 거리</label>
          <input
            type="number"
            id="distance"
            name="distance"
            class="input-field mr-2"
            placeholder="상행 하행역 거리"
            required
          />
          <label for="duration" class="input-label" hidden>상행 하행역 시간</label>
          <input
            type="number"
            id="duration"
            name="arrival"
            class="input-field"
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
    </div>`;
}

export { sectionsTemplate, sectionsModalTemplate };
