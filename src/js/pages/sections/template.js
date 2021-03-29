import { optionTemplate } from '../../templates/option';

const sectionEditModalTemplate = `
  <div id="section-edit-modal" class="modal">
    <div class="modal-inner p-8">
      <button class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
      <header>
        <h2 class="text-center">🔁 구간 수정</h2>
      </header>
      <form id="section-edit-form">
        <div class="d-flex items-center input-control">
          <select id="up-station"></select>
          <div class="d-inline-block mx-3 text-2xl">➡️</div>
          <select id="down-station"></select>
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
  </div>
`;

const sectionAddModalTemplate = `
  <div id="section-add-modal" class="modal">
    <div class="modal-inner p-8">
      <button class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
      <header>
        <h2 class="text-center">🔁 구간 추가</h2>
      </header>
      <form id="section-add-form">
        <div class="d-flex items-center input-control">
          <select id="up-station"></select>
          <div class="d-inline-block mx-3 text-2xl">➡️</div>
          <select id="down-station"></select>
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
  </div>
`;

const sectionListItem = ({ upStation, downStation = {}, distance = -1, duration = -1 }) => `
  <li
    class="js-section-list-item d-flex items-center relative list-item"
    data-up-station-id="${upStation.id}"
    data-up-station-name="${upStation.name}"
    data-down-station-id="${downStation.id ?? ''}"
    data-distance="${distance}"
    data-down-station-name="${downStation.name ?? ''}"
    data-duration="${duration}"
  >
    <span class="w-100 pl-6">${upStation.name}</span>
    <button
      type="button"
      class="js-section-delete-button section-delete-button"
    >
      ❌
    </button>
    <div class="section-detail">
      ${duration > -1 ? `<div class="section-duration">${duration}</div>` : ''}
      ${distance > -1 ? `<div class="section-distance">${distance}</div>` : ''}
      <div class="section-edit">
        <button
          type="button"
          class="js-section-add-button section-add-button mr-1"
        >
          ➕
        </button>
        <button
          type="button"
          class="js-section-edit-button section-edit-button"
        >
          ✏️
        </button>
      </div>
    </div>
  </li>
`;

export const sectionListItems = sections =>
  sections
    .map(({ upStation, downStation, distance, duration }) =>
      sectionListItem({ upStation, downStation, distance, duration })
    )
    .join('');

const sectionsPageTemplate = (lines = []) => `
  <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4"></header>
      <main class="mt-10 d-flex justify-center">
        <div class="wrapper bg-white p-10">
          <div class="heading d-flex">
            <h2 class="mt-1 w-100">🔁 구간 관리</h2>
          </div>
          <form class="d-flex items-center pl-1">
            <select id="line-select">
              <option value="" disabled selected hidden>노선 선택</option>
              ${lines.map(({ id, name }) => optionTemplate(id, name)).join('')}
            </select>
          </form>
          <ul class="js-section-list mt-3 pl-0" data-line-id=""></ul>
        </div>
      </main>
    </div>
  </div>
  ${sectionAddModalTemplate}
  ${sectionEditModalTemplate}
`;

export default sectionsPageTemplate;
