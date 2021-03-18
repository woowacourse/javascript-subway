import { UserAuth } from './components/UserAuth';

export class UserManage {
  constructor(props) {
    this.props = props;
    this.moutChildComponents();
  }

  moutChildComponents() {
    this.userAuth = new UserAuth(this.props);
  }
}
