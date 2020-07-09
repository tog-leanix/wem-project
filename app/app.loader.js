import { Menu } from '../components/menu.js';
import { Root } from './app.root.js';
import { TestPage } from '../pages/test.page.js';

const components = [Root, Menu, TestPage];

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
