import { SELECTOR_CLASS, SELECTOR_ID, PATH } from '../constants.js';
import { $ } from '../utils/querySelector.js';

export default class Navigator {
  #selector;

  constructor(selector = `#${SELECTOR_ID.NAVIGATOR}`) {
    this.#selector = selector;
  }

  render() {
    const parent = $(this.#selector);
    parent.innerHTML = this.#getTemplate();
  }

  initPushStateEvent(onPushState) {
    $(this.#selector).addEventListener('click', e => {
      if (!e.target.classList.contains(SELECTOR_CLASS.NAVIGATOR_BUTTON)) return;
      e.preventDefault();

      const path = e.target.getAttribute('href');
      history.pushState({ path }, null, path);
      onPushState(path);
    });
  }

  // TODO : 이거 굳이 동적으로 넣는 이유가 뭔지 알아보기
  #getTemplate() {
    return `
      <a href="${PATH.ROOT}" class="text-black">
        <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
      </a>
      <nav class="d-flex justify-center flex-wrap">
        <a href="${PATH.STATIONS}" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1 my-1 text-sm d-flex items-center">
          🚉 역 관리
        </a>
        <a href="${PATH.LINES}" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1 my-1 text-sm d-flex items-center">
          🛤️ 노선 관리
        </a>
        <a href="${PATH.SECTIONS}" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1 my-1 text-sm d-flex items-center">
          🔁 구간 관리
        </a>
        <a href="${PATH.SUBWAY}" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1 my-1 text-sm d-flex items-center">
          🗺️ 전체 보기
        </a>
        <a href="${PATH.SEARCH}" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1 my-1 text-sm d-flex items-center">
          🔎 길 찾기
        </a>
        <a href="${PATH.LOG_IN}" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1 my-1 text-sm d-flex items-center">
          👤 로그인
        </a>
      </nav>
    `;
  }
}
