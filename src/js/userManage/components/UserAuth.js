import { linkButton } from '../../@shared/views/linkButton';

export class UserAuth {
  constructor(props) {
    this.props = props;
    this.selectDOM();
    this.initRender();
  }

  selectDOM() {
    this.$container = document.querySelector('.sign-button-container');
  }

  initRender() {
    this.$container.innerHTML = this.props.isSigned
      ? linkButton({ link: '#', text: '로그아웃' })
      : linkButton({ link: '#signin', text: '로그인' });
  }
}
