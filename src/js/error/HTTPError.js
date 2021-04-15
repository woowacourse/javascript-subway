import { UNAUTHENTICATED_LINK } from '../constants/link';
import Router from '../Router';
import { showSnackbar } from '../utils/snackbar';
import App from '../App';

class HTTPError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
  }

  handleError() {
    switch (this.status) {
      case 401:
        App.setIsLogin(false);
        Router.goPage(UNAUTHENTICATED_LINK.LOGIN);

      default:
        showSnackbar(this.message);
        break;
    }
  }
}

export default HTTPError;
