const paths = ['/', '/login', '/signup', '/stations', '/lines', '/sections', '/map'];

const getAvailablePath = (path, isLoggedIn) => {
  if (!paths.includes(path)) return '/';

  if (isLoggedIn) {
    if (path === '/login' || path === '/signup') return '/';

    return path;
  } else {
    if (path === '/login' || path === '/signup') return path;

    return '/login';
  }
};

export default getAvailablePath;
