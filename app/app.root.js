import { LitElement, html } from 'https://unpkg.com/lit-element?module';
import { Router } from './app.routing.js';

export class Root extends LitElement {
  viewContent = html``;

  constructor() {
    super();
    Router.onRouteChange((state) => {
      console.log(state);
      if (state.tagName) {
        this.viewContent = html`<${state.tagName}></${state.tagName}>`;
      }
    });
  }

  render() {
    return html`
      <tg-menu></tg-menu>
      <main>
        ${this.viewContent}
      </main>
    `;
  }
}
