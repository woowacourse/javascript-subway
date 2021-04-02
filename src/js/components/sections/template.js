export const sectionListTemplate = (section, index) => {
  return `
    <li class="section-list-item d-flex items-center py-2 relative bottom-line">
      <span class="w-100 pl-6 section-name">${section.upStation.name} <-> ${section.downStation.name}</span>
      <button
        type="button"
        class="section-edit-button bg-gray-50 text-gray-500 text-sm mr-1"
        data-index=${index}
      >
        수정
      </button>
      <button
        type="button"
        class="section-delete-button bg-gray-50 text-gray-500 text-sm"
        data-index=${index}
      >
        삭제
      </button>
    </li>
  `;
};

const optionTemplate = (data) => {
  return `<option value=${data.id}>${data.name}</option>`;
};

export const sectionsTemplate = (stationList = [], lineList = []) => {
  return `
      <div class="sections-container container wrapper bg-white p-10">
            <div class="heading d-flex">
              <h2 class="mt-1 w-100">🔁 구간 관리</h2>
              <button
                type="button"
                class="create-section-btn modal-trigger-btn bg-cyan-300 ml-2"
              >
                구간 추가
              </button>
            </div>
            <form class="d-flex items-center pl-1">
              <select id="line-select" class="bg-blue-400">
              ${
                lineList.length
                  ? `<option value="" selected disabled>노선을 선택해주세요</option>` +
                    lineList.map((line) => optionTemplate(line)).join('')
                  : `<option value="" selected disabled>노선을 추가해주세요</option>`
              }
              </select>
            </form>
            <ul id="section-list-container" class="mt-3 pl-0">
            </ul>
        </div>
      <div class="modal">
        <div class="modal-inner p-8">
        <button class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 id="modal-title" class="text-center">🔁 구간 추가</h2>
        </header>
        <form>
          <div class="input-control">
            <select id="modal-line-select">
              ${
                lineList.length
                  ? lineList.map((line) => optionTemplate(line)).join('')
                  : `<option value="" selected disabled>노선을 추가해주세요</option>`
              }
            </select>
          </div>
          <div class="d-flex items-center input-control">
            <select id="previous-station-select">
              <option value="" selected disabled hidden>이전역</option>
              ${
                stationList.length
                  ? stationList.map((station) => optionTemplate(station)).join('')
                  : `<option value="" selected disabled>역을 추가해주세요</option>`
              }
            </select>
            <div class="d-inline-block mx-3 text-2xl">➡️</div>
            <select id="next-station-select">
              <option value="" selected disabled hidden>다음역</option>
              ${
                stationList.length
                  ? stationList.map((station) => optionTemplate(station)).join('')
                  : `<option value="" selected disabled>역을 추가해주세요</option>`
              }
            </select>
          </div>
          <div class="input-control">
            <label for="distance-input" class="input-label" hidden
            >거리</label
            >
            <input
              type="number"
              id="distance-input"
              name="distance-input"
              class="input-field"
              placeholder="거리"
              required
            />
            <label for="duration-input" class="input-label" hidden
            >시간</label
            >
            <input
              type="number"
              id="duration-input"
              name="duration-input"
              class="input-field"
              placeholder="시간"
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
     </div>`;
};
