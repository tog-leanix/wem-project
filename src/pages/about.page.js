import { LitElement, html } from 'https://unpkg.com/lit-element?module';

export class AboutPage extends LitElement {
  render() {
    return html`<tg-article uri="src/templates/about.html"></tg-article>`;
  }
}
