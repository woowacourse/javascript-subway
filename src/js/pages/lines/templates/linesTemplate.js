import user from '../../../models/user.js';

const linesTemplate = `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex">
        <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
        <button
        id=""
          type="button"
          class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2"
        >
          노선 추가
        </button>
      </div>
      <ul id="line-list" class="mt-3 pl-0"></ul>
    </div>
    
    <div id="lines-modal" class="modal"></div>`;

function linesModalTemplate(allStations = {}) {
  return `
    <div class="modal-inner p-8">
      <button class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
      <header>
        <h2 class="text-center">🛤️ 노선 추가</h2>
      </header>
      <form id="lines-form">
        <div class="input-control">
          <label for="line-name" class="input-label" hidden
            >노선 이름</label
          >
          <input
            type="text"
            id="line-name"
            name="line-name"
            class="input-field"
            placeholder="노선 이름"
            minlength="2"
            maxlength="10"
            required
          />
        </div>

        <div class="d-flex items-center mb-5">
          <label for="up-station" class="input-label" hidden>상행역</label>
          <select id="up-station" class="mr-2">
            <option value="" selected disabled hidden>상행역</option>
              ${Object.values(allStations)
                .map(
                  station =>
                    `<option value=${station.id}>${station.name}</option>`
                )
                .join('')}
          </select>
          
          <label for="down-station" class="input-label" hidden>하행역</label>
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
            min="1"
            required
          />
          <label for="duration" class="input-label" hidden>상행 하행역 시간</label>
          <input
            type="number"
            id="duration"
            name="arrival"
            class="input-field"
            placeholder="상행 하행역 시간"
            min="1"
            required
          />
        </div>

        <div class="d-flex flex-col">
          <label for="line-color" class="input-label d-flex mx-auto mb-5 text-gray-500">노선 색상을 아래에서 선택해주세요.</label>
          <div class="d-flex justify-around">
            <div class="line-color-selector px-2"></div>
            <div class="w-40">
                <div id="selected-line-color" class="d-flex">
                <input
                  type="text"
                  id="line-color"
                  name="line-color"
                  class="input-field d-flex my-auto text-center"
                  disabled
                  required
                /></div>
            </div>
          </div>
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

function linesModifyingModalTemplate(targetLine) {
  return `
    <div class="modal-inner p-8">
      <button class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
      <header>
        <h2 class="text-center">🛤️ 노선 추가</h2>
      </header>
      <form id="lines-modify-form">
        <div class="input-control">
          <label for="line-name" class="input-label" hidden
            >노선 이름</label
          >
          <input
            type="text"
            id="line-name"
            name="line-name"
            class="input-field"
            placeholder="노선 이름"
            value=${targetLine.name}
            required
          />
        </div>

        <div class="d-flex items-center mb-5">
          <label for="up-station" class="input-label" hidden>상행역</label>
          <select id="up-station" class="mr-2" disabled>
            <option value=${targetLine.upStation.id} selected hidden>
              ${targetLine.upStation.name}
            </option>
          </select>
          
          <label for="down-station" class="input-label" hidden>하행역</label>
          <select id="down-station" disabled>
          <option value=${targetLine.downStation.id} selected hidden>
              ${targetLine.downStation.name}
            </option>
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
            value=${targetLine.distance}
            disabled
            required
          />
          <label for="duration" class="input-label" hidden>상행 하행역 시간</label>
          <input
            type="number"
            id="duration"
            name="arrival"
            class="input-field"
            placeholder="상행 하행역 시간"
            value=${targetLine.duration}
            disabled
            required
          />
        </div>

        <div class="d-flex flex-col">
          <label for="line-color" class="input-label d-flex mx-auto mb-5 text-gray-500">노선 색상을 아래에서 선택해주세요.</label>
          <div class="d-flex justify-around">
            <div class="line-color-selector px-2"></div>
            <div class="w-40">
              <div id="selected-line-color" class="d-flex ${targetLine.color}">
                <input
                type="text"
                id="line-color"
                name="line-color"
                class="input-field d-flex my-auto text-center"
                value=${targetLine.color}
                disabled
                required
                />
              </div>
            </div>
          </div>
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

export { linesTemplate, linesModalTemplate, linesModifyingModalTemplate };
