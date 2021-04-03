import '../css/index.css';
import '../images/subway_emoji.png';
import App from './App.js';

const path = window.location.pathname;
const app = new App();
app.init(path);
