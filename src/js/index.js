const headerTemplate = `
<a href="/" class="text-black">
  <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
</a>
<nav>
  <ul class="d-flex justify-center flex-wrap">
    <li>
      <a href="/pages/stations.html" class="my-1 btn bg-white shadow d-flex items-center text-sm">
        🚉 역 관리
      </a>
    </li>
    <li>
      <a href="/pages/lines.html" class="my-1 btn bg-white shadow d-flex items-center text-sm">
        🛤️ 노선 관리
      </a>
    </li>
    <li>
      <a href="/pages/sections.html" class="my-1 btn bg-white shadow d-flex items-center text-sm">
        🔁 구간 관리
      </a>
    </li>
    <li>
      <a href="/pages/map.html" class="my-1 btn bg-white shadow d-flex items-center text-sm">
        🗺️ 전체 보기
      </a>
    </li>
    <li>
      <a href="/pages/search.html" class="my-1 btn bg-white shadow d-flex items-center text-sm">
        🔎 길 찾기
      </a>
    </li>
    <li>
      <a href="/pages/login.html" class="my-1 btn bg-white shadow d-flex items-center text-sm">
        👤 로그인
      </a>
    </li>
  </ul>
</nav>`;

document.querySelector('header').innerHTML = headerTemplate;
