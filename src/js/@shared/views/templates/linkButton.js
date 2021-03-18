export const linkButton = ({ link = '', text = '' }) => {
  return `
  <a href="${link}" class="my-1">
    <button class="js-link-button btn bg-white shadow mx-1">${text}</button>
  </a>`;
};
