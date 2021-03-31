export const OPTION_TEMPLATE = (stationList, headOptionText) => {
  const headOption = `<option value="" selected hidden>${headOptionText}</option>`;
  const bodyOptions = stationList.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');

  return `${headOption}${bodyOptions}`;
};

export const LIST_ITEM_TEMPLATE = ({ id, name, color, stations }) => {
  const upStation = stations[0];
  const downStation = stations[stations.length - 1];

  return `<li class="line-list-item d-flex flex-col py-2 relative">
  <form class="edit-form" data-line-id="${id}" data-line-name="${name}">
    <div class="d-flex justify-between">
      <div>
        <i class="remove-button fas fa-minus-circle" data></i>
        <input type="text" class="pl-6 edit-line-name" name="name" minlength="2" maxlength="10" value="${name}" disabled required />
        <span>상행역: ${upStation.name}</span>
        <span>하행역: ${downStation.name}</span>
      </div>
      <div>
        <label for="edit-line-color-${id}" class="input-label" hidden>색상</label>
        <input type="color" id="edit-line-color-${id}" name="color" placeholder="색상" value="${color}" disabled required />
        <i class="edit-button fas fa-edit" data-line-id="1"></i>
        <i class="check-button fas fa-check" data-line-id="1"></i>
        <i class="undo-button fas fa-undo" data-line-id="1"></i>
      </div>
    </div>
  </form>
</li>
<hr class="my-0" />
`;
};

export const LINES_TEMPLATE = `
<div class="heading d-flex">
  <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
</div>

<form class="add-form">
  <div class="input-control">
    <label for="add-line-name" class="input-label" hidden>노선 이름</label>
    <input type="text" id="add-line-name" name="name" class="input-field" placeholder="노선 이름" minlength="2" maxlength="10" required />
    <button type="submit" class="submit-button input-submit bg-cyan-300 ml-2" name="submit" disabled >추가</button>
  </div>
  <div class="d-flex items-center input-control">
    <label for="add-up-station" class="input-label" hidden>상행역</label>
    <select id="add-up-station" class="mr-2 input-field" name="upStationId" required></select>

    <label for="add-down-station" class="input-label" name="add-down-station"hidden>하행역</label>
    <select id="add-down-station" class="mr-2 input-field" name="downStationId" required ></select>

    <label for="add-distance" class="input-label" hidden>거리</label>
    <input type="number" id="add-distance" name="distance" class="input-field mr-2" placeholder="0" min="1" step="1" required />

    <label for="duration" class="input-label" hidden>시간</label>
    <input type="number" id="add-duration" name="duration" class="input-field" placeholder="0" min="1" step="1" required />

    <div>
      <label for="add-line-color" class="input-label" hidden>색상</label>
      <input type="color" id="add-line-color" name="color" placeholder="색상" required />
    </div>
  </div>
</form>

<ul class="mt-3 pl-0">
</ul>
`;
