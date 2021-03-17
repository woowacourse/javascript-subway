export const headerTemplate = `
  <a href="/" class="text-black">
    <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
  </a>
  <nav class="d-flex justify-center flex-wrap"></nav>`;

export const getNavButtonTemplate = ({ ROUTE, NAME }) => {
  return `
  <a href="${ROUTE}" class="my-1">
    <button class="btn bg-white shadow mx-1">${NAME}</button>
  </a>`;
};
