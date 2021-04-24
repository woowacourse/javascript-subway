import { PATH } from '../../../constants/path';

const headerTemplate = `
<nav class="d-flex justify-center flex-wrap">
  <ul class="d-flex">
    <li class="my-1 mx-2">
      <a href="${PATH.STATIONS}">
        <button class="bg-cyan-80" data-nav-path="${PATH.STATIONS}">🚉 역 관리</button>
      </a>
    </li>
    <li class="my-1 mx-2">
      <a href="${PATH.LINES}">
        <button class="bg-cyan-80" data-nav-path="${PATH.LINES}">🛤️ 노선 관리</button>
      </a>
    </li>
    <li class="my-1 mx-2">
      <a href="${PATH.SECTIONS}">
        <button class="bg-cyan-80" data-nav-path="${PATH.SECTIONS}">🔁 구간 관리</button>
      </a>
    </li>
    <li class="my-1 mx-2">
      <a href="${PATH.LOOKUPLINES}">
        <button class="bg-cyan-80" data-nav-path="${PATH.LOOKUPLINES}">🎇 모든 노선 조회</button>
      </a>
    </li>
  </ul>
</nav>`;

export default headerTemplate;
