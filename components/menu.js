import { LitElement, html } from 'https://unpkg.com/lit-element?module';
import { Router } from '../app/app.routing.js';
import { Test } from './test.js';

export class Menu extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html` <div @click="${this.handleClick}">Test</div>`;
  }

  handleClick(e) {
    console.log(e);
    Router.navigate('test');
  }
}
