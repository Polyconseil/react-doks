/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const launchHotServer = require('./launchHotServer.js');
const patchWebpackConfig = require('./patchWebpackConfig');
const buildStaticDoks = require('./buildStaticDoks');

module.exports = (config) => {
  // Add doks static assets :
  config.serveStaticResources.push({path: '/doks-static', resource: path.join(__dirname, '../doks-static/')});

  /** Prepare constants that will be passed down to the built bundle : **/
  const bundleConstants = {};

  console.log('\n');
  bundleConstants.requireContextRoot = config.defaultRoot;

  // If a folder/file is selected :
  if (config.selectedPath) {
    // Stat given path :
    try {
      // Path found :
      const stats = fs.statSync(config.selectedPath);
      bundleConstants.singleFile = stats.isFile();
      bundleConstants.selectedPath = config.selectedPath;

      // If single file, no need for side menu etc... ==> DOCS_EXPLORER_SINGLE_FILE = false inside the bundle
      // The whole directory won't be searched by WP's require.context ==> faster build
      console.log('Selected ' + (bundleConstants.singleFile ? 'file :' : 'folder :'));
      console.log(config.selectedPath);
    } catch (err) {
      // Path not found :
      console.warn('WARNING : ', config.contextPath, 'not found.\nUsing default root folder : ', config.defaultRoot);
      bundleConstants.singleFile = false;
    }
  } else {
    // Build with a side panel even if the folder contains only one file : more predictable
    bundleConstants.singleFile = false;
    bundleConstants.selectedPath = config.defaultRoot;
  }
  console.log('\n');

  // Regex to only fetch files at the root of a docs folder :
  bundleConstants.regexp = new RegExp('/' + config.docsFolder + '/[a-zA-Z0-9_-]+.jsx?$');

  patchWebpackConfig(config, bundleConstants);

  /**
   * Either build a static site to be served on gh-pages (or any kind of web server), OR launch a WP dev server :
   */
  if (config.buildStatic) {
    buildStaticDoks(config);
  } else {
    launchHotServer(config);
  }
};
