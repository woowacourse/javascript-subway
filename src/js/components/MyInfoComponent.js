import Component from './Component.js';
import MY_INFO_TEMPLATE from '../templates/myInfoTemplate.js';

class MyInfoComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    super.render(MY_INFO_TEMPLATE);
  }
}

export default MyInfoComponent;
