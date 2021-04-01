export const contentTemplate = `
  <div class="wrapper bg-white p-10">
  <div class="heading">
    <h2 class="mt-1">🗺️ 전체 보기</h2>
  </div>

  <div id="search-option">
    <form class="d-flex items-center pl-1 flex-col justify-center">
      <label for="line-select" class="input-label mb-1">노선으로 찾기</label>
      <select id="line-select" class="border-4 border-color-gray-100 bg-white border-solid pr-10">
        <option value="" selected>전체 보기</option>
      </select>
    </form>
    <span class="text-center">또는</span>
    <form class="d-flex items-center pl-1 flex-col">
      <label for="station-select" class="input-label mb-1">역 이름으로 찾기</label>
      <select id="station-select" class="border-4 border-color-gray-100 bg-white border-solid pr-10">
        <option value="" selected>전체 보기</option>
      </select>
    </form>
  </div>

  <hr class="my-5">

  <ul id="line-list">
  </ul>

  <p id="no-line-warning" class="d-none text-center">❌ 검색 조건에 해당하는 노선이 없습니다.</p>
`;
