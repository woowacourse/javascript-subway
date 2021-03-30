import { MENU } from '../../constants/constants';

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
    <form class="d-flex items-center pl-1 relative">
      <select id="main-line-selector">
      </select>
    </form>
    <hr class="section-hr"/>
    <ul id="section-list" class="mt-3 pl-0">
    </ul>
  </div>
`;
