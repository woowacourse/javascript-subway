export const render = () => {
  const $container = document.querySelector('.container');
  const $modal = document.querySelector('.modal');
  const { main = '', modal = '' } = history.state.contents;
  $container.innerHTML = main;
  $modal.innerHTML = modal;
};
