import { LitElement, html } from 'https://unpkg.com/lit-element?module';

export class HomePage extends LitElement {
  render() {
    return html`<tg-article uri="src/templates/home.html"></tg-article>`;
  }
}
