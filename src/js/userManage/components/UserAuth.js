import { linkButton } from '../../@shared/views';
import { $ } from '../../@shared/utils';
export class UserAuth {
  constructor(props) {
    this.props = props;
    this.selectDOM();
    this.render();
  }

  selectDOM() {
    this.$container = $('.sign-button-container');
  }

  render() {
    this.$container.innerHTML = this.props.isSigned
      ? linkButton({ link: '#', text: '로그아웃' })
      : linkButton({ link: '#signin', text: '로그인' });
  }
}
