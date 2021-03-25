const routeTo = (path) => {
  history.pushState({ path }, null, path);
  window.dispatchEvent(new CustomEvent('pushState', { detail: path }));
};

window.addEventListener('popstate', (e) => {
  routeTo(e.state.path);
});

export default routeTo;
