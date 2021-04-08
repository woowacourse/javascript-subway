import { ID_SELECTOR } from '../constants';

const MAIN_COMPONENT = `
<main class="mt-10 d-flex justify-center">
  <div class="wrapper bg-white p-10">
    <div class="heading d-flex">
      <h2 class="mt-1 w-100">🗺 전체 보기</h2>
    </div>
    <ul id="${ID_SELECTOR.FULL_MAP_LINE_LIST}" class="pl-0">
      <li>
      </li>
    </ul>
  </div>
</main>`;

const FULL_MAP_TEMPLATE = {
  TITLE: `🗺 전체 보기`,
  MAIN: MAIN_COMPONENT,
};

export default FULL_MAP_TEMPLATE;
