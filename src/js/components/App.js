import Component from '../core/Component.js';
import Navigation from './navigation/Navigation.js';

export default class App extends Component {
  constructor() {
    super();
  }

  mountComponent() {
    this.Navigation = new Navigation();
  }
}
