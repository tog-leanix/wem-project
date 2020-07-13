import { LitElement, html, css } from 'https://unpkg.com/lit-element?module';
import { Router } from '../app/app.routing.js';

export class Article extends LitElement {
  static get properties() {
    return { uri: { type: String, hasChanged: this.uriChanged } };
  }

  innerHTML = html``;

  static get styles() {
    return css``;
  }

  firstUpdated() {
    if (this.uri) {
      this.loadHTMLLayout(Router.rootPath + this.uri);
    }
  }

  async loadHTMLLayout(uri) {
    const htmlFile = await (await fetch(uri)).text();
    const article = document.createElement('article');
    article.innerHTML = htmlFile;
    this.innerHTML = article;
    this.requestUpdate();
  }

  render() {
    return html`${this.innerHTML ? this.innerHTML : 'Loading...'}`;
  }
}
