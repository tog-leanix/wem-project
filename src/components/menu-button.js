import { LitElement, html, css } from 'https://unpkg.com/lit-element?module';

export class MenuButton extends LitElement {
  static get properties() {
    return { open: { type: Boolean } };
  }

  static get styles() {
    return css`
      .menuBtn {
        display: none;
        position: absolute;
        right: 2em;
        height: 5em;
        width: 5em;
        clip-path: circle(2em);
        background: var(--primary);
      }

      .menuIcon {
        width: 2em;
        height: 2em;
        background: var(--text-color);
        margin: auto;
        transition: 0.5s;
      }

      .menuIcon.close {
        clip-path: polygon(
          20% 0%,
          0% 20%,
          30% 50%,
          0% 80%,
          20% 100%,
          50% 70%,
          80% 100%,
          100% 80%,
          70% 50%,
          100% 20%,
          80% 0%,
          50% 30%
        );
      }

      .menuIcon.menu {
        clip-path: polygon(
          0 20%,
          50% 100%,
          50% 100%,
          50% 100%,
          50% 100%,
          50% 100%,
          50% 100%,
          50% 100%,
          100% 20%,
          70% 20%,
          50% 50%,
          30% 20%
        );
      }

      @media (max-width: 720px) {
        .menuBtn {
          display: block;
        }
      }
    `;
  }

  // constructed clip path icon with: https://bennettfeely.com/clippy/
  // animating clip path: https://css-tricks.com/animating-with-clip-path/
  // make sure you add same amount of poly points to animate it!

  constructor() {
    super();
    this.open = true;
  }

  /**
   * Send event to parent element that open changed
   * @param {boolean} newVal new open value
   */
  async openChanged(newVal) {
    const openEvent = new CustomEvent('openChange', {
      detail: {
        open: newVal
      }
    });
    this.open = newVal;
    this.dispatchEvent(openEvent);
  }

  render() {
    return html`
      <button class="menuBtn" @click="${() => this.openChanged(!this.open)}">
        <div class="menuIcon ${this.open ? 'close' : 'menu'}"></div>
      </button>
    `;
  }
}
