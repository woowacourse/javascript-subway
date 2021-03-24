import { routeTo } from '../utils/history';
import {
  mountLogin,
  mountSignup,
  mountSearch,
  mountSections,
  mountStations,
  mountMap,
  mountLines,
  mountError,
} from './routeHandler';
import { authenticatedRoute, unauthenticatedRoute } from './utils';

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
