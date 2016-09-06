const path = require('path');


/**
 * React doks configuration example, applied to the react-doks repo
 *
 */
module.exports = {
  docsFolder: '__docs__',
  defaultRoot: path.join(__dirname, 'doks-docs'),
  webpackConfig: require('./webpack.config.default.js'),
  staticBuildDir: path.join(__dirname, 'docs'),
  contentBase: __dirname,
  index: 'index.html',
  serveStatic: [],
};
