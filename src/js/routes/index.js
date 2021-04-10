import {
  mountError,
  mountLines,
  mountLogin,
  mountMap,
  mountSearch,
  mountSections,
  mountSignup,
  mountStations,
} from '../pages';
import { authenticatedRoute, unauthenticatedRoute } from './utils';
import { routeTo } from '../utils/history';

const routeHandler = {
  '/': () => authenticatedRoute(mountStations),

  '/login': () => unauthenticatedRoute(mountLogin),
  '/signup': () => unauthenticatedRoute(mountSignup),

  '/search': () => authenticatedRoute(mountSearch),
  '/sections': () => authenticatedRoute(mountSections),
  '/stations': () => authenticatedRoute(mountStations),
  '/map': () => authenticatedRoute(mountMap),
  '/lines': () => authenticatedRoute(mountLines),

  '/error': mountError,
};

const initRouter = () => {
  window.addEventListener('popstate', ({ state }) => {
    (routeHandler[state.path] ?? routeHandler['/error'])();
  });

  window.addEventListener('pushstate', ({ detail }) => {
    (routeHandler[detail.path] ?? routeHandler['/error'])();
  });

  const path = window.location.pathname;

  routeTo(path);
};

export default initRouter;
