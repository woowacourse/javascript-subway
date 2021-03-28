import { colorOptions } from '../../utils/index.js';

const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button type="button" class="color-option bg-${color}"></button> ${hasNewLine ? '<br/>' : ''}`;
};

export const lineListTemplate = (line) => {
  return `<li class="line-list-item d-flex items-center py-2 relative bottom-line" data-id=${line.id}>
            <span class="subway-line-color-dot" style="background-color: ${line.color}"></span>
            <span class="w-100 pl-6 line-name"
              >${line.name}</span
            >
            <button
              type="button"
              class="line-edit-button bg-gray-50 text-gray-500 text-sm mr-1"
              data-id = ${line.id}
            >
              수정
            </button>
            <button
              type="button"
              class="line-delete-button bg-gray-50 text-gray-500 text-sm"
              data-id = ${line.id}
            >
              삭제
            </button>
          </li>
         `;
};

const optionTemplate = (station) => {
  return `<option value=${station.id}>${station.name}</option>`;
};

export const linesTemplate = (stationList, lineList) => {
  return `
    <div class="lines-container container wrapper bg-white p-10 ">
      <div class="heading d-flex">
        <h2  class="mt-1 w-100">🛤️ 노선 관리</h2>
        <button
          type="button"
          id="line-create-button"
          class="create-line-btn modal-trigger-btn bg-cyan-300 ml-2"
        >
          노선 추가
        </button>
      </div>
      <ul id="lines-list-container" class="mt-3 pl-0">
        ${lineList.map((line) => lineListTemplate(line)).join('')}
      </ul>
     </div>

     <div class="modal">
      <div class="modal-inner p-8">
       <button id="modal-close-button" class="modal-close">
         <svg viewbox="0 0 40 40">
           <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
         </svg>
       </button>
       <header>
         <h2 id="modal-title" class="text-center">🛤️ 노선 추가</h2>
       </header>
       <form id="modal-form">
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
             ${stationList.map((station) => optionTemplate(station)).join('')}
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
            ${stationList.map((station) => optionTemplate(station)).join('')}
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
            placeholder="색상을 선택해주세요."
            readonly
          />
         </div>
         <div class="d-flex justify-center">
          <div class="subway-line-color-selector px-2" disabled>
           ${colorOptions.map(subwayLineColorOptionTemplate).join('')}
          </div>
         </div>
         <div class="d-flex justify-end mt-3">
           <button
             name="submit"
             class="input-submit bg-cyan-300"
           >
             확인
           </button>
         </div>
         </form>
       </div>
       </div>`;
};
