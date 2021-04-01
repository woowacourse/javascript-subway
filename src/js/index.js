// import '../css/index.css';
import App from './components/App.js';

window.addEventListener('DOMContentLoaded', () => {
  new App();
  console.log(window.location.pathname);
  const popStateEvent = new Event('popstate');
  window.dispatchEvent(popStateEvent);
});
