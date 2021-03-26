import { palette } from './palette';

export const lineModal = `
  <div id="modal-content" class="modal-inner p-8">
  <button class="modal-close">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>
  <header>
    <h2 class="text-center">🛤️ 노선 추가</h2>
  </header>
  <form id="line-form">
    <div class="input-control flex-col">
      <div class="d-flex w-100">
        <label for="subway-line-name" class="input-label" hidden>노선 이름</label>
        <input
          type="text"
          id="line-name-input"
          name="subway-line-name"
          class="input-field"
          placeholder="노선 이름"
          required
        />
      </div>
      <div
        id="fail-message-box"
        class="js-message-box message-box mt-1 text-red mb-1 text-center"
        >
      </div>
      </div>
    <div class="d-flex items-center input-control">
      <label for="up-station" class="input-label" hidden>상행역</label>
      <select id="up-station" class="mr-2">
        <option value="" selected disabled hidden>상행역</option>
        <option>사당</option>
        <option>방배</option>
        <option>서초</option>
      </select>
      <label for="down-station" class="input-label" hidden>하행역</label>
      <select id="down-station">
        <option value="" selected disabled hidden>하행역</option>
        <option>사당</option>
        <option>방배</option>
        <option>서초</option>
      </select>
    </div>
    <div class="input-control">
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
    <div class="input-control">
      <div>
        <label for="subway-line-color" class="input-label" hidden>색상</label>
        <input
          type="text"
          id="line-color"
          name="subway-line-color"
          class="input-field"
          placeholder="색상을 아래에서 선택해주세요."
          disabled
          required
        />
      </div>
    </div>
    <div id="line-color-selector" class="line-color-selector px-2 d-flex justify-center">
      <div>
        ${palette}
      </div>
    </div>
    <div class="d-flex justify-end mt-3">
      <button id="line-submit-button" type="submit" name="submit" class="input-submit bg-cyan-300">확인</button>
    </div>
  </form>
  </div>
`;
