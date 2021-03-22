import { MENU } from '../../constants/constants';

export const lineManage = `
  <div id="content" class="wrapper bg-white p-10">
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">${MENU.LINES}</h2>
      <button
        type="button"
        class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2"
      >
        노선 추가
      </button>
    </div>
    <ul class="mt-3 pl-0">
      <li class="d-flex items-center py-2 relative">
        <span class="subway-line-color-dot bg-blue-400"></span>
        <span class="w-100 pl-6 subway-line-list-item-name"
          >1호선</span
        >
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
      <hr class="my-0" />
    </ul>
  </div>
`;
