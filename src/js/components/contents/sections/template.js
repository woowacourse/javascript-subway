import '../../../../css/pages/sections.css';

const SECTIONS_TEMPLATE = `
<div class="wrapper bg-white p-10">
  <div class="heading d-flex">
    <h2 class="mt-1 w-100">🔁 구간 관리</h2>
    <i class="edit-button fas fa-edit" data-line-id="1"></i>
  </div>
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
  </form>

  <ul class="mt-3 pl-0">
    <li class="station-list-item d-flex items-center py-2">
      <i class="remove-button fas fa-minus-circle" data-station-id="1"></i>
      <span class="w-100 pl-2">사당</span>
      <i class="plus-button fas fa-plus-circle" data-station-id="1"></i>
      <i class="undo-button fas fa-undo" data-station-id="1"></i>
      <label for="other-stations" class="input-label" hidden >역선택</label>
      <input type="number" class="distance" value="1" min="0" required />
      <input type="number" class="duration" value="1" min="0" required />
    </li>
    <li class="section-list-item d-flex items-center py-2">
      <form>
        <label for="subway-line-for-section" class="input-label" hidden>역 선택</label>
        <select>
          <option value="" selected disabled hidden>역 선택</option>
          <option>사당</option>
          <option>방배</option>
          <option>서초</option>
        </select>
        <i class="check-button fas fa-check-circle" data-station-id="1"></i>
        <input type="number" class="distance" value="20" min="0" required />
        <input type="number" class="duration" value="100" min="0" required />
      </form>
    </li>
    <hr class="my-0" />
    <li class="station-list-item d-flex items-center py-2">
      <span class="w-100 pl-2">잠실</span>
      <input type="number" class="distance" value="1 km" min="0" hidden required />
      <input type="number" class="duration" value="1 분" min="0" hidden required />
    </li>
    <hr class="my-0" />
  </ul>
</div>`;

export default SECTIONS_TEMPLATE;
