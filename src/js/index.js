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
  Router,
});

app.addStaticEventListeners();
app.checkLogin();

class test {
  register(event) {}
}

app.render();
