import '../css/index.css';
import { $ } from './utils/DOM';
import App from './App';

const initalState = {
  isLogin: false,
};

const app = new App({
  parentNode: $('#app'),
  state: initalState,
});

app.addStaticEventListeners();
app.checkLogin();
