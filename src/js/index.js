import { $, hasPropertyValue } from './utils/index.js';
import { ROUTES } from './constants/index.js';

const headerTemplate = `
<a href="/" class="text-black">
  <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
</a>
<nav class="d-flex justify-center flex-wrap">
  <a href="/pages/stations.html" class="my-1">
    <button class="btn bg-white shadow mx-1">🚉 역 관리</button>
  </a>
  <a href="/pages/lines.html" class="my-1">
    <button class="btn bg-white shadow mx-1">🛤️ 노선 관리</button>
  </a>
  <a href="/pages/sections.html" class="my-1">
    <button class="btn bg-white shadow mx-1">🔁 구간 관리</button>
  </a>
  <a href="/pages/login.html" class="my-1">
    <button class="btn bg-white shadow mx-1">👤 로그인</button>
  </a>
</nav>`;

const $header = $('header');
$header.innerHTML = headerTemplate;

// TODO: 브라우저 히스토리 관리, 렌더 추가
// eslint-disable-next-line no-unused-vars
const route = (pathname) => {
  // console.log(pathname);
  // fetch().then((data) => {
  // push() URL 수동 추가(히스토리 push)
  // render(data) url에 맞게 render(JS넣어주기)
  // });
};

const isSameOrigin = (targetOrigin) => window.location.origin === targetOrigin;
const isValidPathname = (pathname) => hasPropertyValue(ROUTES, pathname);

const handleHeaderClick = (event) => {
  const { target: $target } = event;
  const $anchor = $target.closest('a');

  if (!$anchor) {
    return;
  }

  const { origin, pathname } = $anchor;

  if (!isSameOrigin(origin)) {
    return;
  }

  if (!isValidPathname(pathname)) {
    return;
  }

  event.preventDefault();
  route(pathname);
};

$header.addEventListener('click', handleHeaderClick);
