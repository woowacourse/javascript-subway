import { ID_SELECTOR } from '../constants';

const MAIN_COMPONENT = `
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
  <form id="${ID_SELECTOR.SECTION_FORM}" class="d-flex items-center pl-1">
    <select id="${ID_SELECTOR.SECTION_FORM_SELECT}" class="bg-blue-400">
    </select>
  </form>
  <ul id="${ID_SELECTOR.SECTION_LIST}"class="mt-3 pl-0">
  </ul>
</div>
`;

const MODAL_COMPONENT = `
<div class="modal-inner p-8">
  <button class="modal-close">
    <svg viewbox="0 0 40 40">
      <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  </button>
  <header>
    <h2 class="text-center">🔁 구간 추가</h2>
  </header>
  <form>
    <div class="input-control">
      <select>
        <option>1호선</option>
        <option>2호선</option
        >ㅅ
        <option>3호선</option>
        <option>4호선</option>
      </select>
    </div>
    <div class="d-flex items-center input-control">
      <select>
        <option value="" selected disabled hidden>이전역</option>
        <option>사당</option>
        <option>방배</option>
        <option>서초</option>
      </select>
      <div class="d-inline-block mx-3 text-2xl">➡️</div>
      <select>
        <option value="" selected disabled hidden>다음역</option>
        <option>사당</option>
        <option>방배</option>
        <option>서초</option>
      </select>
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
  MAIN: MAIN_COMPONENT,
  MODAL: MODAL_COMPONENT,
};

export default SECTION_TEMPLATE;
