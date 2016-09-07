const path = require('path');


/**
 * React doks configuration for the react-doks repo
 * See doks-docs/Configuration
 *
 */
module.exports = {
  docsFolder: '__docs__',
  defaultRoot: path.join(__dirname, 'doks-docs'),
  webpackConfig: require('./webpack.config.default.js'),
  staticBuildDir: path.join(__dirname, 'docs'),
  index: path.join(__dirname, 'index.html'),
  serve: [],
  port: 3003,
};
