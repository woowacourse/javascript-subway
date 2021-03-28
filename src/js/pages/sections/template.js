import { optionTemplate } from '../../templates/option';

const sectionModalTemplate = `
  <div class="modal">
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
            <option>2호선</option>
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
  </div>
`;

const sectionListItem = (id, name) => `
  <li class="d-flex items-center py-2 relative list-item" data-section-id=${id} data-section-name=${id}>
    <span class="w-100 pl-6">${name}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm"
    >
      삭제
    </button>
  </li>
`;

export const sectionListItems = sections => sections.map(({ id, name }) => sectionListItem(id, name)).join('');

const sectionsPageTemplate = lines => `
  <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4"></header>
      <main class="mt-10 d-flex justify-center">
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
          <form class="d-flex items-center pl-1">
            <select id="line-select">
              <option value="" disabled selected hidden>노선 선택</option>
              ${lines.map(({ id, name }) => optionTemplate(id, name)).join('')}
            </select>
          </form>
          <ul class="js-section-list mt-3 pl-0"></ul>
        </div>
      </main>
    </div>
  </div>
  ${sectionModalTemplate}
`;

export default sectionsPageTemplate;
