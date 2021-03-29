const STATIONS_TEMPLATE = `
<div class="wrapper bg-white p-10">
  <div class="heading">
    <h2 class="mt-1">🚉 역 관리</h2>
  </div>
  <form>
    <div class="d-flex w-100">
      <label for="add-station-name" class="input-label" hidden>역 이름</label>
      <input type="text" id="add-station-name" name="add-station-name" class="input-field add-station-name" placeholder="역 이름" required />
      <button type="submit" name="submit" class="submit-button input-submit bg-cyan-300 ml-2">확인</button>
    </div>
  </form>
  <ul class="mt-3 pl-0">
    <li class="station-list-item d-flex items-center py-2">
      <i class="remove-button fas fa-minus-circle" data-station-id="1"></i>
      <label class="edit-station-name" class="input-label" hidden>역 이름</label>
      <input class="edit-station-name" type="text" value="사당" class="w-100 pl-2" />
      <i class="edit-button fas fa-edit" data-station-id="1"></i>
      <i class="check-button fas fa-check" data-station-id="1"></i>
      <i class="undo-button fas fa-undo" data-station-id="1"></i>
    </li>
    <hr class="my-0" />
    <li class="station-list-item d-flex items-center py-2">
      <span class="w-100 pl-2">방배</span>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
      <button type="button" class="bg-gray-50 text-gray-500">삭제</button>
    </li>
    <hr class="my-0" />
  </ul>
</div>`;

export default STATIONS_TEMPLATE;
