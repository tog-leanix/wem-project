import { LitElement, html, css } from 'https://unpkg.com/lit-element?module';

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
      this.loadHTMLLayout(this.uri);
    }
  }

  async loadHTMLLayout(uri) {
    const htmlFile = await (await fetch(uri)).text();
    console.log(htmlFile);
    const article = document.createElement('article');
    article.innerHTML = htmlFile;
    this.innerHTML = article;
    this.requestUpdate();
  }

  render() {
    return html`${this.innerHTML}`;
  }
}
