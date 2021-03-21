const headerTemplate = `
<nav class="d-flex justify-center flex-wrap">
  <ul class="d-flex">
    <li class="my-1 mx-2">
      <a href="/stations">
        <button class="bg-cyan-80" data-nav-path="/stations">🚉 역 관리</button>
      </a>
    </li>
    <li class="my-1 mx-2">
      <a href="/lines">
        <button class="bg-cyan-80" data-nav-path="/lines">🛤️ 노선 관리</button>
      </a>
    </li>
    <li class="my-1 mx-2">
      <a href="/sections">
        <button class="bg-cyan-80" data-nav-path="/sections">🔁 구간 관리</button>
      </a>
    </li>
  </ul>
</nav>`;

export default headerTemplate;
