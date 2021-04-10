export const contentTemplate = `
  <div class="wrapper bg-white p-10">
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
      <button
        type="button"
        class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2"
      >
        노선 추가
      </button>
    </div>
    <ul id="line-list" class="mt-3 pl-0">
    </ul>
  </div>
`;

export const modalTemplate = `
  <div class="modal-inner p-8">
    <button class="modal-close">
      <svg viewbox="0 0 40 40">
        <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
      </svg>
    </button>
    <header>
      <h2 id="line-modal-title" class="text-center">🛤️ 노선 추가</h2>
    </header>
    <form id="subway-line-form">
      <div class="input-control d-flex flex-col">
        <label for="subway-line-name" class="input-label" hidden
          >노선 이름</label
        >
        <input
          type="text"
          id="subway-line-name"
          name="subway-line-name"
          class="input-field box-border"
          placeholder="노선 이름"
          required
          minLength="2"
          maxLength="10"
          pattern="[가-힣0-9]+||[^A-Za-z !@#$%^&*]"
        />
        <p 
        id="line-duplicated-warning" 
        class="text-xs text-red w-100 ml-8 my-1 d-none"
      >노선이 이미 존재합니다.</p>
      </div>

      <div id="updown-data-container"></div>

      <div class="input-control">
        <div>
          <label for="subway-line-color" class="input-label" hidden
            >색상</label
          >
          <input
            type="text"
            id="subway-line-color"
            name="subway-line-color"
            class="input-field"
            placeholder="색상을 아래에서 선택해주세요."
            disabled
            required
          />
        </div>
      </div>
      <div class="subway-line-color-selector px-2"></div>
      <div class="d-flex justify-end mt-3">
        <button
          type="submit"
          name="submit"
          id="modal-create-line"
          class="input-submit bg-cyan-300"
        >
          확인
        </button>
      </div>
    </form>
  </div>
`;

export const inputSectionTemplate = `
  <div class="updown-data d-flex flex-col items-center input-control"> 
    <div class="d-flex items-center w-100">
      <label for="up-station" class="input-label" hidden>상행역</label>
      <select id="up-station" class="mr-2" required>
        <option value="" selected disabled hidden>상행역</option>
      </select>
      <label for="down-station" class="input-label" hidden
        >하행역</label
      >
      <select id="down-station" required>
        <option value="" selected disabled hidden>하행역</option>
      </select>
    </div>
    <p 
      id="same-station-warning" 
      class="text-xs text-red w-100 ml-8 my-1 d-none"
    >상행역과 하행역은 같을 수 없습니다.</p>
  </div>


  <div class="updown-data input-control">
    <label for="distance" class="input-label" hidden
      >상행 하행역 거리</label
    >
    <input
      type="number"
      id="distance"
      name="distance"
      class="input-field mr-2"
      placeholder="상행 하행역 거리(km)"
      required
    />
    <label for="duration" class="input-label" hidden
      >상행 하행역 시간</label
    >
    <input
      type="number"
      id="duration"
      name="duration"
      class="input-field"
      placeholder="상행 하행역 시간(분)"
      required
    />
  </div>
`;
