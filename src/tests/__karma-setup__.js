/* eslint-disable no-console */

// Babel-polyfill needed in the webpack bundles to use async/await
import 'babel-polyfill';

/**
 * Karma-setup :
 *
 * Global setups and methods to help running tests in the browser with Karma, but
 *
 */


/**
 * DOM Environment :
 * In Karma, WithDOM only clears the #root node, because a full DOM API is already available in the browser
 */
beforeEach(() => {
  document.getElementById('root').innerHTML = '';
});

console.log('Setting up Karma');

// We set the environment to test, mostly for react-clipboard whose dependency matches-selector fails when in test mode
process.env.NODE_ENV = 'test';

/**
 * Giving React a DOM Node to render tested components :
 */
const node = document.createElement('div');
node.id = 'root';
const b = document.getElementsByTagName('body')[0];
b.appendChild(node);
