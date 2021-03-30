import '../css/index';
import App from './components/App';

const path = window.location.pathname;
const app = new App();

app.init();
app.initializeRoutedPage(path);
