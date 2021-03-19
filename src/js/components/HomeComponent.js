import Component from "./Component.js";
import HOME_TEMPLATE from '../templates/homeTemplate.js';

class HomeComponent extends Component {
  constructor(state) {
    super(state);
  }

  render() {
    super.render(HOME_TEMPLATE);
  }

}

export default HomeComponent;
