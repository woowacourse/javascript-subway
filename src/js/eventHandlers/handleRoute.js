import { routeTo } from '../utils/history.js';

const handleRoute = event => {
  const $target = event.target.closest('.js-link');

  if (!$target) return;
  event.preventDefault();

  const path = $target.getAttribute('href');
  routeTo(path);
};

export default handleRoute;
