import '../css/index.css';

const headerTemplate = `
<a href="/" class="text-black">
  <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
</a>
<nav class="d-flex justify-center flex-wrap">
  <a href="/pages/stations.html" id="stations-nav-link" class="my-1">
    <button class="btn bg-white shadow mx-1">🚉 역 관리</button>
  </a>
  <a href="/pages/lines.html" id="lines-nav-link" class="my-1">
    <button class="btn bg-white shadow mx-1">🛤️ 노선 관리</button>
  </a>
  <a href="/pages/sections.html" id="sections-nav-link" class="my-1">
    <button class="btn bg-white shadow mx-1">🔁 구간 관리</button>
  </a>
  <a href="/pages/map.html" id="map-nav-link" class="my-1">
    <button class="btn bg-white shadow mx-1">🗺️ 전체 보기</button>
  </a>
  <a href="/pages/search.html" id="search-nav-link" class="my-1">
    <button class="btn bg-white shadow mx-1">🔎 길 찾기</button>
  </a>
  <a href="/pages/login.html" id="login-nav-link" class="my-1">
    <button class="btn bg-white shadow mx-1">👤 로그인</button>
  </a>
</nav>`;

document.querySelector('header').innerHTML = headerTemplate;
