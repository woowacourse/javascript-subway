export const linkButton = ({ link = null, text = '' }) => {
  try {
    if (!link) throw new Error('link is not defined');

    return `<button data-link="${link}" class="js-link btn bg-white shadow mx-1">${text}</button>`;
  } catch (error) {
    console.error(error.message);
  }
};
