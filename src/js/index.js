import '../css/index.css';

const headerTemplate = `
<a href="/" class="text-black">
  <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
</a>
<nav class="js-navigation d-flex justify-center flex-wrap">
  <a href="/pages/stations.html" class="my-1">
    <button class="js-navigation__stations btn bg-white shadow mx-1">🚉 역 관리</button>
  </a>
  <a href="/pages/lines.html" class="my-1">
    <button class="js-navigation__lines btn bg-white shadow mx-1">🛤️ 노선 관리</button>
  </a>
  <a href="/pages/sections.html" class="my-1">
    <button class="js-navigation__sections btn bg-white shadow mx-1">🔁 구간 관리</button>
  </a>
  <a href="/pages/map.html" class="my-1">
    <button class="js-navigation__map btn bg-white shadow mx-1">🗺️ 전체 보기</button>
  </a>
  <a href="/pages/search.html" class="my-1">
    <button class="js-navigation__search btn bg-white shadow mx-1">🔎 길 찾기</button>
  </a>
  <a href="/pages/login.html" class="my-1">
    <button class="js-navigation__login btn bg-white shadow mx-1">👤 로그인</button>
  </a>
</nav>`;

const App = () => {
  document.querySelector('header').innerHTML = headerTemplate;
  document.querySelector('header').addEventListener('click', (e) => {
    e.preventDefault();
    const url = e.target.closest('a').getAttribute('href');
    history.pushState({ url }, null, url);
  });
};

window.addEventListener('DOMContentLoaded', () => {
  App();
});
