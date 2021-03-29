import { ID_SELECTOR, CLASS_SELECTOR, THRESHOLD } from '../constants.js';
import { colorOptionMatrix } from '../utils/mock.js';

const MAIN_COMPONENT = `
<main class="mt-10 d-flex justify-center">
  <div class="wrapper bg-white p-10">
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
      <button
        type="button"
        id=${ID_SELECTOR.LINE_CREATION_BUTTON}
        class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2"
      >
        노선 추가
      </button>
    </div>
    <ul id="${ID_SELECTOR.LINE_LIST}" class="mt-3 pl-0">
    </ul>
  </div>
  </main>`;

const MODAL_COMPONENT = `
<div class="modal-inner line-creation-modal-inner p-8">
<button class="${CLASS_SELECTOR.MODAL_CLOSE} modal-close"}>
  <svg viewbox="0 0 40 40">
    <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
  </svg>
</button>
<header>
  <h2 class="text-center">🛤️ 노선 추가</h2>
</header>
<form id="${ID_SELECTOR.LINE_MODAL_FORM}">
  <div class="input-control">
    <label for="${ID_SELECTOR.LINE_MODAL_FORM_NAME}" class="input-label" hidden
      >노선 이름</label
    >
    <input
      type="text"
      minlength=${THRESHOLD.LINE_NAME_MIN_LENGTH}
      maxlength=${THRESHOLD.LINE_NAME_MAX_LENGTH}
      id="${ID_SELECTOR.LINE_MODAL_FORM_NAME}"
      name="subway-line-name"
      class="input-field"
      placeholder="노선 이름"
      required
    />
  </div>
  <div class="d-flex items-center input-control">
    <label for="${
      ID_SELECTOR.LINE_MODAL_FORM_UP_STATION
    }" class="input-label" hidden>상행역</label>
    <select id="${ID_SELECTOR.LINE_MODAL_FORM_UP_STATION}" class="mr-2">
      <option value="" selected disabled hidden>상행역</option>
      <option>사당</option>
      <option>방배</option>
      <option>서초</option>
    </select>
    <label for="${
      ID_SELECTOR.LINE_MODAL_FORM_DOWN_STATION
    }" class="input-label" hidden
      >하행역</label
    >
    <select id="${ID_SELECTOR.LINE_MODAL_FORM_DOWN_STATION}">
      <option value="" selected disabled hidden>하행역</option>
      <option>사당</option>
      <option>방배</option>
      <option>서초</option>
    </select>
  </div>
  <div class="input-control">
    <label for="${
      ID_SELECTOR.LINE_MODAL_FORM_DISTANCE
    }" class="input-label" hidden
      >상행 하행역 거리</label
    >
    <input
      type="number"
      id="${ID_SELECTOR.LINE_MODAL_FORM_DISTANCE}"
      name="distance"
      class="input-field mr-2"
      placeholder="상행 하행역 거리"
      required
    />
    <label for="${
      ID_SELECTOR.LINE_MODAL_FORM_DURATION
    }" class="input-label" hidden
      >상행 하행역 시간</label
    >
    <input
      type="number"
      id="${ID_SELECTOR.LINE_MODAL_FORM_DURATION}"
      name="arrival"
      class="input-field"
      placeholder="상행 하행역 시간"
      required
    />
  </div>
  <div class="input-control">
    <div>
      <label for="${
        ID_SELECTOR.LINE_MODAL_FORM_COLOR
      }" class="input-label" hidden
        >색상</label
      >
      <input
        type="text"
        id="${ID_SELECTOR.LINE_MODAL_FORM_COLOR}"
        name="subway-line-color"
        class="input-field"
        placeholder="색상을 아래에서 선택해주세요."
        disabled
        required
      />
    </div>
  </div>
  <div class="${CLASS_SELECTOR.LINE_COLOR_SELECTOR} px-2">
  ${makeSubwayLineColorOption()}
  </div>
  <div class="d-flex justify-end mt-3">
    <button
      id="${ID_SELECTOR.LINE_MODAL_FORM_SUBMIT}"
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

const REVISION_MODAL_COMPONENT = `
<div class="modal-inner line-revision-modal-inner p-8">
<button class="${CLASS_SELECTOR.MODAL_CLOSE} modal-close"}>
  <svg viewbox="0 0 40 40">
    <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
  </svg>
</button>
<header>
  <h2 class="text-center">🔧 노선 수정</h2>
</header>
<form id="${ID_SELECTOR.LINE_MODAL_FORM}">
  <div class="input-control">
    <label for="${ID_SELECTOR.LINE_MODAL_FORM_NAME}" class="input-label" hidden
      >노선 이름</label
    >
    <input
      type="text"
      minlength=${THRESHOLD.LINE_NAME_MIN_LENGTH}
      maxlength=${THRESHOLD.LINE_NAME_MAX_LENGTH}
      id="${ID_SELECTOR.LINE_MODAL_FORM_NAME}"
      name="subway-line-name"
      class="input-field"
      placeholder="노선 이름"
      required
    />
  </div>
  <div class="input-control">
    <div>
      <label for="${
        ID_SELECTOR.LINE_MODAL_FORM_COLOR
      }" class="input-label" hidden
        >색상</label
      >
      <input
        type="text"
        id="${ID_SELECTOR.LINE_MODAL_FORM_COLOR}"
        name="subway-line-color"
        class="input-field"
        placeholder="색상을 아래에서 선택해주세요."
        disabled
        required
      />
    </div>
  </div>
  <div class="${CLASS_SELECTOR.LINE_COLOR_SELECTOR} px-2">
  ${makeSubwayLineColorOption()}
  </div>
  <div class="d-flex justify-end mt-3">
    <button
      id="${ID_SELECTOR.LINE_MODAL_FORM_SUBMIT}"
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
function makeSubwayLineColorOption() {
  return colorOptionMatrix
    .map(colorOptions =>
      colorOptions.map(subwayLineColorOptionTemplate).join('')
    )
    .join('<br/>');
}

function subwayLineColorOptionTemplate(colorOption) {
  return `<button data-color="${colorOption}" type="button" class="${CLASS_SELECTOR.LINE_COLOR_SELECTOR_OPTION} color-option bg-${colorOption} mr-1"></button>`;
}

const LINE_TEMPLATE = {
  TITLE: `🚇 노선 관리`,
  MAIN: MAIN_COMPONENT,
  //TODO: DEFAULT_MODAL로 이름바꾸기
  MODAL: MODAL_COMPONENT,
  REVISION_MODAL_COMPONENT,
};

export default LINE_TEMPLATE;
