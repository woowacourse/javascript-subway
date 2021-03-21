export const navigationTemplate = (token) => {
  return `
    <a href="/stations" class="navigation-link my-1">
        <button
            id="navigation-stations-button"
            class="navigation-button btn bg-white shadow mx-1"
        >
            🚉 역 관리
        </button>
    </a>
    <a href="/lines" class="navigation-link my-1">
        <button
            id="navigation-lines-button"
            class="navigation-button btn bg-white shadow mx-1"
        >
            🛤️ 노선 관리
        </button>
    </a>
    <a href="/sections" class="navigation-link my-1">
        <button
            id="navigation-sections-button"
            class="navigation-button btn bg-white shadow mx-1"
        >
            🔁 구간 관리
        </button>
    </a>
    <a href="/login" class="navigation-link my-1">
        <button
            id="navigation-login-button"
            class="navigation-button btn bg-white shadow mx-1 ${
              token ? 'd-none' : ''
            }"
        >
            👤 로그인
        </button>
    </a>
    <a href="/logout" class="navigation-link my-1">
        <button
            id="navigation-logout-button"
            class="navigation-button btn bg-white shadow mx-1 ${
              token ? '' : 'd-none'
            }"
        >
            👤 로그아웃
        </button>
    </a>`;
};
