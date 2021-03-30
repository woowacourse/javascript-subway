import { MENU } from '../../constants/constants';

export const sectionInfo = ({ id, name }) => `
  <li data-station-id=${id} class="js-station-list-item border-bottom d-flex items-center py-2 my-2">
    <span class="js-station-name w-100 pl-2">${name}</span>
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
  <div id="main-content" class="manage wrapper bg-white p-10">
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
    <form class="d-flex items-center pl-1 relative">
      <select id="main-line-selector">
      </select>
    </form>
    <hr class="section-hr"/>
    <ul id="section-list" class="mt-3 pl-0">
    </ul>
  </div>
`;
