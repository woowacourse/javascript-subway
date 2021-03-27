import { colorOptions } from '../../utils/index.js';

const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button type="button" class="color-option bg-${color}"></button> ${
    hasNewLine ? '<br/>' : ''
  }`;
};

const lineListTemplate = () => {
  return `<li class="line-list-item d-flex items-center py-2 relative bottom-line">
            <span class="subway-line-color-dot bg-blue-400"></span>
            <span class="w-100 pl-6 subway-line-list-item-name"
              >1호선</span
            >
            <button
              type="button"
              class="line-edit-button bg-gray-50 text-gray-500 text-sm mr-1"
            >
              수정
            </button>
            <button
              type="button"
              class="line-delete-button bg-gray-50 text-gray-500 text-sm"
            >
              삭제
            </button>
          </li>
         `;
};

export const linesTemplate = () => {
  return `
    <div class="lines-container container wrapper bg-white p-10 ">
      <div class="heading d-flex">
        <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
        <button
          type="button"
          id="line-create-button"
          class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2"
        >
          노선 추가
        </button>
      </div>
      <ul id="lines-list-container" class="mt-3 pl-0">
        ${lineListTemplate()}
      </ul>
     </div>

     <!-- 노선 생성용 모달 -->

     <div id="line-create-modal" class="modal">
      <div class="modal-inner p-8">
       <button class="modal-close">
         <svg viewbox="0 0 40 40">
           <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
         </svg>
       </button>
       <header>
         <h2 class="text-center">🛤️ 노선 추가</h2>
       </header>
       <form id="line-create-form">
         <div class="input-control">
           <label for="line-name-input" class="input-label" hidden
             >노선 이름</label
           >
           <input
             type="text"
             id="line-name-input"
             name="line-name-input"
             class="input-field"
             placeholder="노선 이름"
             required
           />
         </div>
         <div class="input-control">
           <label for="departure-station-select" class="select-label" hidden
             >상행역</label
           >
            <select
             id="departure-station-select"
             name="departure-station-select"
             required
             >
              <option value="잠실역">잠실역</option>
              <option value="사당역">사당역</option>
            </select>
           <label for="arrival-station-select" class="select-label" hidden
             >하행역</label
           >
           <select
             type="text"
             id="arrival-station-select"
             name="arrival-station-select"
             required
           >
            <option value="잠실역">잠실역</option>
            <option value="사당역">사당역</option>
           </select>
         </div>
         <div class="input-control">
          <label for="distance-input" class="input-label" hidden
          >거리</label
          >
          <input
            type="number"
            id="distance-input"
            name="distance-input"
            class="input-field"
            placeholder="거리"
            required
          />
          <label for="duration-input" class="input-label" hidden
          >시간</label
          >
          <input
            type="number"
            id="duration-input"
            name="duration-input"
            class="input-field"
            placeholder="시간"
            required
          />
          <label for="line-color-input" class="input-label" hidden
          >색깔</label
          >
          <input
            type="text"
            id="line-color-input"
            name="line-color-input"
            class="input-field"
            placeholder="색상을 아래에서 선택해주세요."
            readonly
            required
          />
         </div>
         <div class="d-flex justify-center">
          <div class="subway-line-color-selector px-2" disabled>
           ${colorOptions.map(subwayLineColorOptionTemplate).join('')}
          </div>
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

       <!-- 노선 수정용 모달 -->
       
       <div id="line-edit-modal" class="modal">
       <div class="modal-inner p-8">
       <button class="modal-close">
         <svg viewbox="0 0 40 40">
           <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
         </svg>
       </button>
       <header>
         <h2 class="text-center">🛤️ 노선 수정</h2>
       </header>
       <form id="line-edit-form">
         <div class="input-control">
           <label for="line-name-edit-input" class="input-label" hidden
             >노선 이름</label
           >
           <input
             type="text"
             id="line-name-edit-input"
             name="line-name-edit-input"
             class="input-field"
             placeholder="노선 이름"
             required
           />
         </div>
         <div class="input-control">
           <label for="departure-station-edit-select" class="select-label" hidden
             >상행역</label
           >
            <select
             id="departure-station-edit-select"
             name="departure-station-edit-select"
             required
             >
              <option value="잠실역">잠실역</option>
              <option value="사당역">사당역</option>
            </select>
           <label for="arrival-station-edit-select" class="select-label" hidden
             >하행역</label
           >
           <select
             type="text"
             id="arrival-station-edit-select"
             name="arrival-station-edit-select"
             required
           >
            <option value="잠실역">잠실역</option>
            <option value="사당역">사당역</option>
           </select>
         </div>
         <div class="input-control">
          <label for="distance-edit-input" class="input-label" hidden
          >거리</label
          >
          <input
            type="number"
            id="distance-edit-input"
            name="distance-edit-input"
            class="input-field"
            placeholder="거리"
            required
          />
          <label for="duration-edit-input" class="input-label" hidden
          >시간</label
          >
          <input
            type="number"
            id="duration-edit-input"
            name="duration-edit-input"
            class="input-field"
            placeholder="시간"
            required
          />
          <label for="line-color-edit-input" class="input-label" hidden
          >색깔</label
          >
          <input
            type="color"
            id="line-color-edit-input"
            name="line-color-edit-input"
            class="input-field"
            placeholder="색상을 아래에서 선택해주세요."
            readonly
            required
          />
         </div>
         <div class="d-flex justify-center">
          <div class="subway-line-color-selector px-2" disabled>
           ${colorOptions.map(subwayLineColorOptionTemplate).join('')}
          </div>
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
       </div>`;
};
