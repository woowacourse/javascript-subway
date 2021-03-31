import { SELECTOR } from '../../constants';
import { palette } from './palette';

export const lineAddModify = `
  <div id="modal-content" class="modal-inner p-8">
  <button class="modal-close">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>
  <header>
    <h2 class="text-center">🛤️ 정보 입력</h2>
  </header>
  <form id="${SELECTOR.LINE.MODAL.FORM}">
    <div class="input-control flex-col">
      <div class="d-flex w-100">
        <label for="subway-line-name" class="input-label" hidden>노선 이름</label>
        <input
          type="text"
          id="${SELECTOR.LINE.MODAL.NAME_INPUT}"
          name="subway-line-name"
          class="input-field"
          placeholder="노선 이름"
          required
        />
      </div>
      </div>
    <div class="${SELECTOR.LINE.MODAL.NON_MODIFIABLE} d-flex items-center input-control">
      <label for="${SELECTOR.LINE.MODAL.UP_STATION_SELECTOR}" class="input-label" hidden>상행역</label>
      <select id="${SELECTOR.LINE.MODAL.UP_STATION_SELECTOR}" class="mr-2">
      </select>
      <label for="${SELECTOR.LINE.MODAL.DOWN_STATION_SELECTOR}" class="input-label" hidden>하행역</label>
      <select id="${SELECTOR.LINE.MODAL.DOWN_STATION_SELECTOR}">
      </select>
    </div>
    <div class="${SELECTOR.LINE.MODAL.NON_MODIFIABLE} input-control">
      <label for="${SELECTOR.LINE.MODAL.DISTANCE_INPUT}" class="input-label" hidden>상행 하행역 거리</label>
      <input
        type="number"
        id="${SELECTOR.LINE.MODAL.DISTANCE_INPUT}"
        name="distance"
        class="input-field mr-2"
        placeholder="상행 하행역 거리 (km)"
      />
      <label for="${SELECTOR.LINE.MODAL.DURATION_INPUT}" class="input-label" hidden>상행 하행역 시간</label>
      <input
        type="number"
        id="${SELECTOR.LINE.MODAL.DURATION_INPUT}"
        name="duration"
        class="input-field"
        placeholder="상행 하행역 시간 (분)"
      />
    </div>
    <div class="input-control">
      <div>
        <label for="subway-line-color" class="input-label" hidden>색상</label>
        <input
          type="text"
          id="${SELECTOR.LINE.MODAL.COLOR_INPUT}"
          name="subway-line-color"
          class="input-field"
          value="bg-gray-900"
          placeholder="색상을 아래에서 선택해주세요."
          disabled
          required
        />
      </div>
    </div>
    <div id="${SELECTOR.LINE.MODAL.PALETTE}" class="${SELECTOR.LINE.MODAL.PALETTE} px-2 d-flex justify-center">
      <div>
        ${palette}
      </div>
    </div>
    <div
      id="${SELECTOR.LINE.MODAL.MSG}"
      class="js-message-box message-box mt-1 text-red mb-1 text-center"
      >
    </div>
    <div class="d-flex justify-end mt-3">
      <button id="${SELECTOR.LINE.MODAL.SUBMIT_BUTTON}"} type="submit" name="submit" class="input-submit bg-cyan-300">확인</button>
    </div>
  </form>
  </div>
`;
