export const getSectionModalTemplate = () => `
<div class="modal">
  <div class="modal-inner p-8">
    <button class="modal-close">
      <svg viewbox="0 0 40 40">
        <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
      </svg>
    </button>
    <header>
      <h2 class="text-center">🔁 구간 추가</h2>
    </header>
    <form>
      <div class="input-control">
        <label for="subway-line-for-section" class="input-label" hidden
          >노선</label
        >
        <select id="subway-line-for-section">
          <option>1호선</option>
          <option>2호선</option>
          <option>3호선</option>
          <option>4호선</option>
        </select>
      </div>
      <div class="d-flex items-center input-control">
        <label for="up-station" class="input-label" hidden>상행역</label>
        <select id="up-station">
          <option value="" selected disabled hidden>상행역</option>
          <option>사당</option>
          <option>방배</option>
          <option>서초</option>
        </select>
        <div class="d-inline-block mx-3 text-2xl">➡️</div>
        <label for="down-station" class="input-label" hidden
          >하행역</label
        >
        <select id="down-station">
          <option value="" selected disabled hidden>하행역</option>
          <option>사당</option>
          <option>방배</option>
          <option>서초</option>
        </select>
      </div>
      <div class="d-flex justify-end mt-3">
        <button
          type="submit"
          name="submit"
          class="input-submit bg-cyan-300"
        >
          확인
        </button>
      </div>
    </form>
  </div>
</div>
`;
