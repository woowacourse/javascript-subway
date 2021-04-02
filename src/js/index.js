// import '../css/index.css';
import App from './components/App.js';

window.addEventListener('DOMContentLoaded', () => {
  new App();
  const popStateEvent = new Event('popstate');
  window.dispatchEvent(popStateEvent);
});
