import { pushState } from '../utils/history.js';

const handleRouteNavigation = event => {
  event.preventDefault();

  const $target = event.target.closest('.js-link');

  if (!$target) return;

  const path = $target.getAttribute('href');

  pushState(path);
};

export default handleRouteNavigation;
