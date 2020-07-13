import { Article } from '../components/article.js';
import { Menu } from '../components/menu.js';
import { Root } from './app.root.js';
import { TestPage } from '../pages/test.page.js';
import { HomePage } from '../pages/home.page.js';
import { RoutingPage } from '../pages/routing.page.js';
import { AboutPage } from '../pages/about.page.js';
import { StructurePage } from '../pages/structure.page.js';

const components = [Root, Menu, TestPage, HomePage, RoutingPage, AboutPage, StructurePage, Article];

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
