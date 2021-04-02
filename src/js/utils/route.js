export const routeTo = (pathName) => {
  history.pushState({ pathName }, null, pathName);
  window.dispatchEvent(new Event('popstate'));
};
