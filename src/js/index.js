import '../css/index.css';
import { COOKIE_KEY } from './constants/constants';
import { PATH } from './constants/path';
import jwtToken from './jwtToken';
import router from './router';
import routes from './routeTable';

Object.keys(routes).forEach(path => {
  router.setRoute(path, routes[path]);
});

jwtToken.getToken(COOKIE_KEY.JWT_TOKEN)
  ? router.navigate(PATH.ROOT)
  : router.navigate(PATH.LOGIN);

window.addEventListener('popstate', e => {
  if (!e.state) return;

  router.navigate(e.state.path);
});
