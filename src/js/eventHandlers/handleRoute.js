import { routeTo } from '../utils/history.js';

const handleRoute = event => {
  event.preventDefault();
  const $target = event.target.closest('.js-link');

  if (!$target) return;

  const path = $target.getAttribute('href');
  routeTo(path);
};

export default handleRoute;
