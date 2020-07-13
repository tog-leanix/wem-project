import { LitElement, html, css } from 'https://unpkg.com/lit-element?module';
import { Router } from '../app/app.routing.js';

export class Menu extends LitElement {
  menuList = [
    {
      title: 'Home',
      path: ''
    },
    {
      title: 'Structure',
      path: 'structure'
    },
    {
      title: 'Routing',
      path: 'routing'
    },
    {
      title: 'About Me',
      path: 'about'
    }
  ];

  constructor() {
    super();
  }

  static get styles() {
    return css`
      ul {
        list-style: none;
        padding: 0 2em;
        margin: 0;
        display: flex;
        background: var(--primary);
      }

      li {
        padding: 1em 2em;
        cursor: pointer;
        user-select: none;
      }

      li:hover {
        background: var(--primary-dark);
      }

      li:focus,
      .active {
        outline: none;
        background: var(--primary-dark);
      }

      @media (max-width: 720px) {
        ul {
          padding: 0;
          flex-direction: column;
        }
        li {
          text-align: center;
        }
      }
    `;
  }

  render() {
    return html`
      <ul>
        ${this.menuList.map(
          (item) =>
            html` <li
              tabindex="0"
              @click="${() => this.navigatToPage(item.path)}"
              class="${Router.isActiveRoute(item.path) ? 'active' : ''}"
            >
              ${item.title}
            </li>`
        )}
      </ul>
    `;
  }

  navigatToPage(path) {
    Router.navigate(path);
    this.requestUpdate();
  }
}