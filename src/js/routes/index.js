import {
  mountLogin,
  mountSignup,
  mountSearch,
  mountSections,
  mountStations,
  mountMap,
  mountLines,
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
};

const initRouter = () => {
  window.addEventListener('popstate', ({ state }) => {
    routeHandler[state.path]();
  });

  window.addEventListener('pushstate', ({ detail }) => {
    routeHandler[detail.path]();
  });

  routeHandler['/']();
};

export default initRouter;
