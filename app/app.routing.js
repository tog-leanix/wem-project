const navigationChanged = new Event('navigationchange');

export class Router {
  static init() {
    window.history.replaceState(null, 'Home', '/');
  }

  static navigate(tagName, title) {
    window.history.pushState({ tagName }, title, tagName);
    window.dispatchEvent(navigationChanged);
  }

  static pop() {
    window.history.back();
  }

  static onRouteChange(cb) {
    window.addEventListener('navigationchange', () => {
      cb(window.history.state);
    });
  }
}
