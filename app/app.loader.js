import { Menu } from '../components/menu.js';
import { Root } from './app.root.js';

const components = [Root, Menu];

export class Loader {
  constructor() {}

  static init() {
    components.forEach((component) => registerComponents(component));
  }
}

const registerComponents = (litElementClass) => {
  if (litElementClass) {
    const className = litElementClass.name.toLowerCase();
    customElements.define(`tg-${className}`, litElementClass);
    console.debug(`Load component: <tg-${className}>`);
  }
};
