export const LIST_ITEM_TEMPLATE = ({ id, name }) => `
<li class="station-list-item d-flex items-center py-2">
  <i class="remove-button fas fa-minus-circle" data-station-id="${id}"}></i>
  <form>
    <label for="edit-station-name-${id}" class="input-label" hidden>역 이름</label>
    <input type="text" id="edit-station-name-${id}" class="w-100 pl-2 edit-station-name" name="name" value="${name}" />
  </form>
  <i class="edit-button fas fa-edit" data-station-id="${id}"></i>
  <i class="check-button fas fa-check" data-station-id="${id}"></i>
  <i class="undo-button fas fa-undo" data-station-id="${id}"></i>
</li>
<hr class="my-0" />
`;

export const STATIONS_TEMPLATE = `
<div class="wrapper bg-white p-10">
  <div class="heading">
    <h2 class="mt-1">🚉 역 관리</h2>
  </div>
  <form>
    <div class="d-flex w-100">
      <label for="add-station-name" class="input-label" hidden>역 이름</label>
      <input type="text" id="add-station-name" class="input-field add-station-name" name="name" placeholder="역 이름" minlength="2" maxlength="20" required />
      <button type="submit" class="submit-button input-submit bg-cyan-300 ml-2" name="submit" disabled>추가</button>
    </div>
  </form>
  <ul class="mt-3 pl-0">
  </ul>
</div>`;
