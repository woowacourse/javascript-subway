import { PATHNAMES } from '../../../constants/index.js';

const HEADER_TEMPLATE = `
<a href="${PATHNAMES.HOME}">
  <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
</a>
<nav class="d-flex justify-center flex-wrap">
  <a href="${PATHNAMES.STATIONS}" class="my-1">
    <button class="btn bg-white shadow mx-1">🚉 역 관리</button>
  </a>
  <a href="${PATHNAMES.LINES}" class="my-1">
    <button class="btn bg-white shadow mx-1">🛤️ 노선 관리</button>
  </a>
  <a href="${PATHNAMES.SECTIONS}" class="my-1">
    <button class="btn bg-white shadow mx-1">🔁 구간 관리</button>
  </a>
  <a href="${PATHNAMES.LOGIN}" id="login" class="my-1">
    <button class="btn bg-white shadow mx-1">👤 로그인</button>
  </a>
</nav>`;

export default HEADER_TEMPLATE;
