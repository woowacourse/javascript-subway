const regExpForHexCode = /(#[0-9a-fA-F]{6})|(#[0-9a-fA-F]{3})/;

export const OPTION_TEMPLATE = (stationList, headOptionText) => {
  const headOption = `<option value="" selected hidden>${headOptionText}</option>`;
  const bodyOptions = stationList.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');

  return `${headOption}${bodyOptions}`;
};

export const LIST_ITEM_TEMPLATE = ({ id, name, color, stations }) => {
  const upStation = stations[0];
  const downStation = stations[stations.length - 1];
  const colorTested = regExpForHexCode.test(color) ? color : '#000000';

  return `
  <li class="line-list-item d-flex flex-col relative">
    <form class="edit-form" data-line-id="${id}" data-line-name="${name}" data-line-color="${color}">
      <div class="d-flex justify-between">
        <div class="d-flex items-center">
          <label for="edit-line-color-${id}" class="input-label sr-only">색상</label>
          <input type="color" id="edit-line-color-${id}" class="line-color-input" name="color" placeholder="색상" value="${colorTested}" disabled required />

          <label for="edit-line-name-${id}" class="input-label sr-only">노선 이름</label>
          <input type="text" id="edit-line-name-${id}" class="pl-3 edit-line-name station-add-input-field" name="name" minlength="2" maxlength="10" value="${name}" disabled required />

          <span class="mr-3">${upStation.name}</span>
          <span class="mr-3">➡</span>
          <span>${downStation.name}</span>
        </div>

        <div class="edit-buttons d-flex justify-center items-center ml-2">
          <i class="remove-button fas fa-trash-alt d-none"></i>
          <i class="edit-button fas fa-edit d-none"></i>
          <i class="check-button fas fa-check d-none"></i>
          <i class="undo-button fas fa-undo d-none"></i>
        </div>
      </div>
    </form>
  </li>
<hr class="my-0" />`;
};

export const LINES_TEMPLATE = `
<div class="heading d-flex">
  <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
</div>

<form class="add-form line-add-form">
  <label for="add-line-name" class="input-label sr-only">노선 이름</label>
  <input type="text" id="add-line-name" name="name" class="line-input-field" placeholder="노선 이름" minlength="2" maxlength="10" required />

  <label for="add-up-station" class="input-label sr-only">상행역</label>
  <select id="add-up-station" class="line-input-field" name="upStationId" required></select>

  <label for="add-down-station" class="input-label sr-only">하행역</label>
  <select id="add-down-station" class="line-input-field" name="downStationId" required></select>

  <div class="relative">
    <label for="add-distance" class="input-label sr-only">거리</label>
    <input type="number" id="add-distance" name="distance" class="line-input-field"  placeholder="0" min="1" max="9999" step="1" required />
    <span></span>
  </div>

  <div class="relative">
    <label for="duration" class="input-label sr-only">시간</label>
    <input type="number" id="add-duration" name="duration" class="line-input-field" placeholder="0" min="1" max="9999" step="1" required />
    <span></span>
  </div>

  <div id="line-color-container" class="d-flex items-center relative justify-evenly items-center px-3">
    <input type="color" id="add-line-color" class="line-color-input" name="color" placeholder="색상" required />
    <label for="add-line-color" id="add-line-color-label" class="input-label">#000000</label>
  </div>

  <button type="submit" class="submit-button line-add-button bg-cyan-300" name="submit" disabled>추가</button>
</form>

<ul class="mt-3 pl-0"></ul>
`;
