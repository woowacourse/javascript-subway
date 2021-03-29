const LINES_TEMPLATE = `
<div class="wrapper bg-white p-10">
  <div class="heading d-flex">
    <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
  </div>

  <form>
    <div class="input-control">
      <label for="add-line-name" class="input-label" hidden>노선 이름</label>
      <input
        type="text"
        id="add-line-name"
        name="add-line-name"
        class="input-field"
        placeholder="노선 이름"
        minlength="2"
        maxlength="10"
        required
      />
      <button type="submit" class="submit-button input-submit bg-cyan-300 ml-2">추가</button>
    </div>
    <div class="d-flex items-center input-control">
      <label for="add-up-station" class="input-label" hidden>상행역</label>
      <select id="add-up-station" class="mr-2">
        <option value="" selected disabled hidden>상행역</option>
        <option>사당</option>
        <option>방배</option>
        <option>서초</option>
      </select>

      <label for="add-down-station" class="input-label" hidden>하행역</label>
      <select id="add-down-station">
        <option value="" selected disabled hidden>하행역</option>
        <option>사당</option>
        <option>방배</option>
        <option>서초</option>
      </select>

      <label for="add-distance" class="input-label" hidden>거리</label>
      <input type="number" id="add-distance" name="add-distance" class="input-field mr-2" placeholder="0 km" required />

      <label for="duration" class="input-label" hidden>시간</label>
      <input type="number" id="add-duration" name="add-duration" class="input-field" placeholder="0 분" required />

      <div>
        <label for="add-line-color" class="input-label" hidden>색상</label>
        <input type="color" id="add-line-color" name="add-line-color" placeholder="색상" required />
      </div>
    </div>
  </form>

  <ul class="mt-3 pl-0">
    <li class="line-list-item d-flex flex-col py-2 relative">
      <form>
        <div class="d-flex justify-between">
          <div>
            <i class="remove-button fas fa-minus-circle" data-line-id="1"></i>
            <label for="edit-line-color" class="input-label" hidden>색상</label>
            <input type="color" id="line-color" name="edit-line-color" placeholder="색상" required />
            <input class="w-100 pl-6 line-list-item-name" minlength="2" maxlength="10" value="1호선" required />
          </div>
          <div>
            <i class="edit-button fas fa-edit" data-line-id="1"></i>
            <i class="check-button fas fa-check" data-line-id="1"></i>
            <i class="undo-button fas fa-undo" data-line-id="1"></i>
          </div>
        </div>
        <div class="d-flex items-center input-control d-none">
          <label for="edit-up-station" class="input-label" hidden>상행역</label>
          <select id="edit-up-station" class="mr-2">
            <option value="" selected disabled hidden>상행역</option>
            <option>사당</option>
            <option>방배</option>
            <option>서초</option>
          </select>
          <i class="fas fa-caret-right"></i>
          <label for="edit-down-station" class="input-label" hidden>하행역</label>
          <select id="edit-down-station">
            <option value="" selected disabled hidden>하행역</option>
            <option>사당</option>
            <option>방배</option>
            <option>서초</option>
          </select>

          <label for="edit-distance" class="input-label" hidden>거리</label>
          <input
            type="number"
            id="edit-distance"
            name="edit-distance"
            class="input-field mr-2"
            placeholder="0 km"
            required
          />

          <label for="edit-duration" class="input-label" hidden>시간</label>
          <input
            type="number"
            id="edit-duration"
            name="edit-duration"
            class="input-field"
            placeholder="0 분"
            required
          />
        </div>
      </form>
    </li>
    <hr class="my-0" />
  </ul>
</div>
`;

export default LINES_TEMPLATE;
