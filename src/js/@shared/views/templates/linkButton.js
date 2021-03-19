export const linkButton = ({ link = '', text = '' }) => {
  return `<button data-link="${link}" class="js-link btn bg-white shadow mx-1">${text}</button>`;
};
