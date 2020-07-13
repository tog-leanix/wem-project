import { LitElement, html, css } from 'https://unpkg.com/lit-element?module';
import { Router } from './app.routing.js';

export class Root extends LitElement {
  viewContent = html``;
  static get styles() {
    return css`
      main {
        padding: 1em;
        max-width: 900px;
        margin: auto;
      }
    `;
  }

  constructor() {
    super();
    Router.onRouteChange((state) => {
      if (!state || !state.tag) {
        this.viewContent = html``;
      } else if (state.tag) {
        const htmlElement = document.createElement(state.tag);
        this.viewContent = htmlElement;
      }

      this.requestUpdate();
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
