/* eslint-disable global-require */
/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');

/**
 * Patch webpack config with the values computed in runtime
 */
module.exports = (config, bundleConstants) => {
  const webpackConfig = config.webpackConfig;

  if (!webpackConfig.devtool) {
    webpackConfig.devtool = 'source-map';
  }

  // Replace WP entrypoint with our own entrypoint :
  webpackConfig.entry = [
    path.join(__dirname, './runtime/index.js'),
  ];

  const definePlugin = new webpack.DefinePlugin({
    DOCS_EXPLORER_REQUIRE_CONTEXT_REGEXP: bundleConstants.regexp, // We don't stringify regexp, so that it remains a RegExp litteral in the compiled source
    DOCS_EXPLORER_DEFAULT_ROOT: JSON.stringify(bundleConstants.requireContextRoot), // Root of the require.context that will be generated
    DOCS_EXPLORER_DOCS_FOLDERS: JSON.stringify(config.docsFolder), // Naming convention (eg __docs__)
    DOCS_EXPLORER_SINGLE_FILE: JSON.stringify(bundleConstants.singleFile), // Makes the bundle as light as possible
    DOCS_EXPLORER_SELECTED_PATH: JSON.stringify(bundleConstants.selectedPath),
  });

  // Passing down computed constants to the bundle :
  if (webpackConfig.plugins && webpackConfig.plugins.push) {
    webpackConfig.plugins.push(definePlugin);
  } else {
    webpackConfig.plugins = [definePlugin];
  }

  // Bundle output :
  webpackConfig.output = {
    path: path.join(config.staticBuildDir, 'dist'), // ignored when in dev server mode
    filename: 'bundle.js',
    publicPath: '/dist/',
  };

  // Include the docs root folder to webpack loaders that should load js (babel for example)
  // We need this in case a file in requireContextRoot folder (folder specified in CLI) imports a file located
  // outside of this folder. That way, we ensure every source file is transpiled :
  webpackConfig.module.rules.find(l => l.test.test('file.js')).include.unshift(config.defaultRoot);
};
