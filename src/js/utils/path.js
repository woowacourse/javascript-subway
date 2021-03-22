const paths = ['/', '/login', '/signup', '/stations', '/lines', '/sections'];

const getAvailablePath = (path, isLoggedIn) => {
  if (!paths.includes(path)) return '/';

  if (isLoggedIn) {
    if (path === '/login' || path === '/signup') return '/stations';

    return path;
  } else {
    if (path === '/login' || path === '/signup') return path;

    return '/';
  }
};

export default getAvailablePath;
