const headerTemplate = `
<nav class="d-flex justify-center flex-wrap">
  <ul id='nav' class="d-flex">
    <li class="my-1">
      <a href="/stations">
        <button data-nav-path="/stations">🚉 역 관리</button>
      </a>
    </li>
    <li class="my-1">
      <a href="/lines">
        <button data-nav-path="/lines">🛤️ 노선 관리</button>
      </a>
    </li>
    <li class="my-1" data-nav-path="/sections">
      <a href="/sections">
        <button data-nav-path="/sections">🔁 구간 관리</button>
      </a>
    </li>
  </ul>
</nav>`;

export default headerTemplate;
