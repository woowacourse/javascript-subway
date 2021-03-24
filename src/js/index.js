import AppPage from './components/AppPage.js';
import { URL } from './constants.js';
import '../css/index.css';

const appPage = new AppPage();

appPage.initialize();
appPage.initialRoute(URL.HOME);
