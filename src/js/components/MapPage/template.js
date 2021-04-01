export const contentTemplate = `
  <div class="wrapper bg-white p-10">
  <div class="heading">
    <h2 class="mt-1">전체 보기</h2>
  </div>

  <form class="d-flex items-center pl-1">
    <label for="subway-line" class="input-label" hidden>노선</label>
    <select id="line-select" class="border-4 border-color-gray-100 bg-white">
      <option selected>전체 보기</option>
    </select>
  </form>

  <ul id="subway-list">
  </ul>
`;

// TODO: 각 노선 별 역 전체 보기
// TODO: 검색기능 만들기
