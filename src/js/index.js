import _ from '/src/css/index.css';
import { render } from '../js/router.js';
import NavigationBar from '../js/components/NavigationBar.js';

export default class App {
  constructor() {
    this.navigationBar = new NavigationBar();
  }

  execute() {
    this.navigationBar.init();
    render('/');
  }
}

window.addEventListener('load', () => {
  const path = location.pathname;
  const app = new App();
  app.execute();

  render(path);
});
