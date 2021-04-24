function sectionItemTemplate({ id, name }) {
  return `
    <li class="section-list-item d-flex items-center py-2" data-section-id=${id} data-section-name=${name}>
      <span class="w-100 pl-2">${name}</span>
      <button
        type="button"
        class="js-delete-button btn bg-gray-50 text-gray-500 text-sm"
      >
        삭제
      </button>
    </li>`;
}

function sectionListTemplate(sections) {
  return Object.values(sections)
    .map(section => sectionItemTemplate(section))
    .join('');
}

export { sectionItemTemplate, sectionListTemplate };
