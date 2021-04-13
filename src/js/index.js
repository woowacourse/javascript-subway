import '../css/index.css';
import { $ } from './utils/DOM';
import App from './App';
import Router from './Router';

const initalState = {
  isLogin: false,
};

const app = new App({
  parentNode: $('#app'),
  state: initalState,
  Router: Router,
});

app.addStaticEventListeners();
app.checkLogin();
