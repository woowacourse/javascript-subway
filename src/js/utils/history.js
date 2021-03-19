export const routeTo = path => {
  history.pushState({ path }, '', path);

  window.dispatchEvent(new CustomEvent('pushstate', { detail: { path } }));
};
