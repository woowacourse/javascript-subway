import App from './components/App.js';

// const App = () => {
//   document.querySelector('header').addEventListener('click', (e) => {
//     e.preventDefault();
//     const url = e.target.closest('a').getAttribute('href');
//     history.pushState({ url }, null, url);
//   });
// };

window.addEventListener('DOMContentLoaded', () => {
  new App();
});
