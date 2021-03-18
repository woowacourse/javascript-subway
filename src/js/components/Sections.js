import SectionsModal from "./SectionsModal";

export default class Sections {
  constructor({ $parent }) {
    this.$parent = $parent;
    this.sectionsModal = new SectionsModal();
  }

  render() {
    this.$parent.innerHTML = `
      <div class="wrapper bg-white p-10">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🔁 구간 관리</h2>
          <button
            type="button"
            class="add-btn modal-trigger-btn bg-cyan-300 ml-2"
          >
            구간 추가
          </button>
        </div>
        <form class="d-flex items-center pl-1">
          <select class="bg-blue-400">
            <option>1호선</option>
            <option>2호선</option>
            <option>3호선</option>
            <option>4호선</option>
          </select>
        </form>
        <ul class="mt-3 pl-0">
          <li
            class="d-flex items-center py-2 relative border-b-gray px-2"
          >
            <span class="w-100">인천</span>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1"
            >
              수정
            </button>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm"
            >
              삭제
            </button>
          </li>
        </ul>
      </div>
    `;

    this.sectionsModal.render();
  }
}
