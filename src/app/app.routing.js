import { ROUTES } from './app.routes.js';
const REGISTERED_ROUTES = ROUTES;
export class Router {
  static rootPath = '';
  static init() {
    this.rootPath = window.location.pathname;
    this.navigate('');

    // Little helper to not reload on subpages since we can't route any traffic to index html
    window.onbeforeunload = (event) => {
      if (window.location.pathname !== '/') {
        return '';
      }
    };
  }

  /**
   * Navigate to new page/component in our app
   * @param {string} route Selected route to display
   */
  static navigate(route) {
    const pathToDisplay = REGISTERED_ROUTES.find(
      (registeredRoute) => registeredRoute.path === route
    );
    if (!pathToDisplay) {
      throw new Error('Route not found in registered routes', route);
    }
    window.history.pushState(
      { tag: pathToDisplay.tag },
      this.rootPath + route,
      pathToDisplay.path || '/'
    );
    window.dispatchEvent(new Event('popstate'));
  }

  static pop() {
    window.history.back();
  }

  /**
   * To fix issues with forwards navigation and backwards navigation I used the `popstate` Event
   * Inspired by this post: https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
   * @param {Function} cb Returns current state of navigation where you can find the html element
   */
  static onRouteChange(cb) {
    window.addEventListener('popstate', () => {
      const state = window.history.state;
      console.log('Route state:', state);
      cb(state);
    });
  }

  /**
   * Returns boolean to determine if requested path is active
   * @param {string} route Path to check
   */
  static isActiveRoute(route) {
    return window.location.pathname.split('/')[1] === route;
  }
}
