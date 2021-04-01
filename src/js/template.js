const template = (navigation) => {
  return `
    <a href="/" class="js-link text-black">
      <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
    </a>
    <nav class="d-flex justify-center flex-wrap">
      ${Object.values(navigation).map(getNavButtonTemplate).join('')}
    </nav>
  `;
};

const getNavButtonTemplate = ({ ROUTE, NAME }) => {
  return `
    <a href="${ROUTE}" class="js-link my-1">
      <button class="btn bg-white shadow mx-1">${NAME}</button>
    </a>`;
};

export default template;
