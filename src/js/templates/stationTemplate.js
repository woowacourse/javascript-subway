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

const STATION_TEMPLATE = {
  TITLE: `🚉 역 관리`,
  MAIN: MAIN_COMPONENT,
};

export default STATION_TEMPLATE;
