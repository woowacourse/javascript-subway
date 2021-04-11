import { CLASS_SELECTOR, ID_SELECTOR } from '../constants';

const CREATING_OPTION_IN_MODAL = (value, innerText, isSelected) => {
  return `<option value="${value}" ${
    isSelected ? 'selected' : ''
  }>${innerText}</option>`;
};

const CREATING_OPTION = line => {
  return `<option value="${line.id}">${line.name}</option>`;
};

const CREATING_STATION = station => {
  return `
  <li class="d-flex items-center py-2 relative">
    <span class="w-100 pl-6">${station.name}</span>
    <button
      data-id=${station.id}
      type="button"
      class="${CLASS_SELECTOR.SECTION_LIST_ITEM_REMOVAL} bg-gray-50 text-gray-500 text-sm"
    >
      삭제
    </button>
  </li>
  <hr class="my-0" />`;
};

const MAIN = `
<div class="wrapper bg-white p-10">
  <div class="heading d-flex">
    <h2 class="mt-1 w-100">🔁 구간 관리</h2>
    <button
      id="${ID_SELECTOR.SECTION_CREATION_BUTTON}"
      type="button"
      class="create-section-btn modal-trigger-btn bg-cyan-300 ml-2"
    >
      구간 추가
    </button>
  </div>
  <form id="${ID_SELECTOR.SECTION_FORM}" class="d-flex items-center pl-1">
    <select id="${ID_SELECTOR.SECTION_FORM_SELECT}" >
    </select>
  </form>
  <ul id="${ID_SELECTOR.SECTION_LIST}"class="mt-3 pl-0">
  </ul>
</div>
`;

const MODAL = `
<div class="modal-inner p-8">
  <button class="${CLASS_SELECTOR.MODAL_CLOSE} modal-close">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>
  <header>
    <h2 class="text-center">🔁 구간 추가</h2>
  </header>
  <form id="${ID_SELECTOR.SECTION_MODAL_FORM}">
    <div class="input-control">
      <select id="${ID_SELECTOR.SECTION_MODAL_FORM_LINE_SELECT}">
      </select>
    </div>
    <div class="d-flex items-center input-control">
      <select id="${ID_SELECTOR.SECTION_MODAL_FORM_UP_STATION_SELECT}">
        <option value="" selected disabled hidden>이전역</option>
        <option>사당</option>
        <option>방배</option>
        <option>서초</option>
      </select>
      <div class="d-inline-block mx-3 text-2xl">➡️</div>
      <select id="${ID_SELECTOR.SECTION_MODAL_FORM_DOWN_STATION_SELECT}">
        <option value="" selected disabled hidden>다음역</option>
        <option>사당</option>
        <option>방배</option>
        <option>서초</option>
      </select>
    </div>
    <div class="input-control">
      <label for="${ID_SELECTOR.SECTION_MODAL_FORM_DISTANCE}" class="input-label" hidden
        >상행 하행역 거리</label
      >
      <input
        type="number"
        id="${ID_SELECTOR.SECTION_MODAL_FORM_DISTANCE}"
        name="distance"
        class="input-field mr-2"
        placeholder="상행 하행역 거리"
        min="1"
        required
      />
      <label for="${ID_SELECTOR.SECTION_MODAL_FORM_DURATION}" class="input-label" hidden
        >상행 하행역 시간</label
      >
      <input
        type="number"
        id="${ID_SELECTOR.SECTION_MODAL_FORM_DURATION}"
        name="arrival"
        class="input-field"
        placeholder="상행 하행역 시간"
        min="1"
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

const SECTION_TEMPLATE = {
  TITLE: '🚇 구간 관리',
  MAIN,
  MODAL,
  CREATING_STATION,
  CREATING_OPTION,
  CREATING_OPTION_IN_MODAL,
};

export { SECTION_TEMPLATE };
