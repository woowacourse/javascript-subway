import { UserAuth } from './components/UserAuth';

export class UserManage {
  constructor(props) {
    this.props = props;
    this.mountChildComponents();
  }

  mountChildComponents() {
    this.userAuth = new UserAuth(this.props);
  }
}
