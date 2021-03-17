import { UserAuth } from './components/UserAuth';

export class UserManage {
  constructor(props) {
    this.props = props;
    this.mount();
  }

  mount() {
    this.userAuth = new UserAuth(this.props);
  }
}
