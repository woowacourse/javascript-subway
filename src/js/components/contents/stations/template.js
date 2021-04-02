export const LIST_ITEM_TEMPLATE = ({ id, name }) => `
<li class="station-list-item">
  <form class="edit-form d-flex items-center" data-station-id="${id}" data-station-name="${name}">
    <label for="edit-station-name-${id}" class="input-label sr-only">역 이름</label>
    <input type="text" id="edit-station-name-${id}" class="station-edit-input-field pl-2" name="name" value="${name}" minlength="2" maxlength="20" required disabled />
    <div class="edit-buttons d-flex justify-center items-center ml-2">
      <i class="remove-button far fa-trash-alt d-none"></i>
      <i class="edit-button far fa-edit d-none" ></i>
      <i class="check-button fas fa-check d-none"></i>
      <i class="undo-button fas fa-undo d-none"></i>
    </div>
  </form>
  <hr class="my-0" />
</li>
`;

export const STATIONS_TEMPLATE = `
<div class="heading">
  <h2 class="mt-1">🚉 역 관리</h2>
</div>
<form class="add-form">
  <div class="d-flex">
    <label for="add-station-name" class="input-label sr-only">역 이름</label>
    <input type="text" id="add-station-name" class="station-add-input-field add-station-name" name="name" placeholder="역 이름" minlength="2" maxlength="20" required />
    <button type="submit" class="submit-button station-add-button bg-cyan-300 ml-3" name="submit" disabled>추가</button>
  </div>
</form>
<ul class="d-flex flex-col mt-6 pl-0">
</ul>`;
