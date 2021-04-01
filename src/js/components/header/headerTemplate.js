export const headerTemplate = isLoggedIn => {
  return `
    <a href="/" class="text-black">
      <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
    </a>
    <nav class="menu d-flex justify-center flex-wrap">
      ${isLoggedIn ? userMenu : guestMenu}
    </nav>
  `;
};

const userMenu = `
  <a href="/stations" class="menu__link my-1">
  <button class="btn bg-white shadow mx-1">🚉 역 관리</button>
  </a>
  <a href="/lines" class="menu__link my-1">
  <button class="btn bg-white shadow mx-1">🛤️ 노선 관리</button>
  </a>
  <a href="/sections" class="menu__link my-1">
  <button class="btn bg-white shadow mx-1">🔁 구간 관리</button>
  </a>
  <a href="/map" class="menu__link my-1">
  <button class="btn bg-white shadow mx-1" disabled>🗺️ 전체 보기</button>
  </a>
  <a href="/search" class="menu__link my-1" >
  <button class="btn bg-white shadow mx-1" disabled>🔎 길 찾기</button>
  </a>
  <a href="/logout" class="menu__link my-1">
  <button class="btn bg-white shadow mx-1">👤 로그아웃</button>
  </a>
`;

const guestMenu = `
  <a href="/login" class="menu__link my-1">
  <button class="btn bg-white shadow mx-1">👤 로그인</button>
  </a>
`;
