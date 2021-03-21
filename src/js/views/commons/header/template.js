import { ROUTES } from '../../../constants/index.js';
import { isLoggedIn } from '../../../auth.js';

const HEADER_TEMPLATE = `
<a href="${ROUTES.HOME}" class="text-black">
  <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
</a>
<nav class="d-flex justify-center flex-wrap">
  <a href="${ROUTES.STATIONS}" class="my-1">
    <button class="btn bg-white shadow mx-1">🚉 역 관리</button>
  </a>
  <a href="${ROUTES.LINES}" class="my-1">
    <button class="btn bg-white shadow mx-1">🛤️ 노선 관리</button>
  </a>
  <a href="${ROUTES.SECTIONS}" class="my-1">
    <button class="btn bg-white shadow mx-1">🔁 구간 관리</button>
  </a>
${
  isLoggedIn()
    ? `<a href="${ROUTES.LOGIN}" id="login" class="my-1">
      <button class="btn bg-white shadow mx-1">👤 로그인</button>
    </a>`
    : `<a href="${ROUTES.LOGOUT}" id="logout" class="my-1 d-none">
      <button class="btn bg-white shadow mx-1">👤 로그아웃</button>
    </a>`
}
</nav>`;

export default HEADER_TEMPLATE;
