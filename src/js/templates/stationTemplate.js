import { ID_SELECTOR, THRESHOLD } from '../constants.js';

const MAIN_COMPONENT = `
<div class="wrapper bg-white p-10">
  <div class="heading">
    <h2 class="mt-1">🚉 역 관리</h2>
  </div>
  <form id="${ID_SELECTOR.STATION_FORM}">
    <div class="d-flex w-100">
      <label for="${ID_SELECTOR.STATION_FORM_NAME}" class="input-label" hidden>
        역 이름
      </label>
      <input
        type="text"
        id="${ID_SELECTOR.STATION_FORM_NAME}"
        name="stationName"
        class="input-field"
        placeholder="역 이름"
        minlength=${THRESHOLD.STATION_MIN_LENGTH}
        maxlength=${THRESHOLD.STATION_MAX_LENGTH}
        required
      />
      <button
        id="${ID_SELECTOR.STATION_FORM_SUBMIT}"
        type="submit"
        name="submit"
        class="input-submit bg-cyan-300 ml-2"
      >
        확인
      </button>
    </div>
  </form>
  <ul id=${ID_SELECTOR.STATION_LIST} class="mt-3 pl-0">
  </ul>
</div>
`;

const MODAL_COMPONENT = `
<div class="modal-inner station-modal-inner p-8">
  <button class="modal-close">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>
  <header>
    <h2 class="text-center">🚉 역 이름 수정</h2>
  </header>
  <form>
    <div class="input-control">
      <label for="subway-line-name" class="input-label" hidden
        >노선 이름</label
      >
      <input
        type="text"
        id="subway-line-name"
        name="subway-line-name"
        class="input-field"
        placeholder="노선 이름"
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
`;

const STATION_TEMPLATE = {
  TITLE: `🚉 역 관리`,
  MAIN: MAIN_COMPONENT,
  MODAL: MODAL_COMPONENT,
};

export default STATION_TEMPLATE;
