import { MENU } from '../../constants';

export const sectionInfo = () => `
<li class="js-section-list-item d-flex items-center py-2 relative">
  <span class="js-up-station pl-6"></span>
  <span>-</span>
  <span class="js-down-station pl-6"></span>
  <button
    type="button"
    class="js-modify-button bg-gray-50 text-gray-500 text-sm mr-1"
  >
    수정
  </button>
  <button
    type="button"
    class="js-remove-button bg-gray-50 text-gray-500 text-sm"
  >
    삭제
  </button>
</li>
`;

export const sectionList = sections => sections.map(sectionInfo).join('');

export const sectionManage = `
  <div id="main-content" class="wrapper bg-white p-10">
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">${MENU.SECTIONS}</h2>
      <button
        id="section-add-modal-button"
        type="button"
        class="create-section-btn modal-trigger-btn bg-cyan-300 ml-2"
      >
        구간 추가
      </button>
    </div>
    <select id="main-line-selector">
    </select>
    <ul id="section-list" class="mt-3 pl-0">
    </ul>
  </div>
`;
